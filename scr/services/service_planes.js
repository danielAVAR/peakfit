// SERVICIO DE PLANES Y CONTRATOS
// ============================================================================
//  ACCIONES CRITICAS de este archivo (todas usan transaccion => todo o nada):
//   1. asignarPlan   : crea CONTRATO + INGRESO (pago). Si falla el pago, no queda contrato.
//   2. renovarPlan   : marca el contrato viejo RENOVADO + crea contrato nuevo + INGRESO.
//   3. cancelarPlan  : borra el SEGUIMIENTO + marca contrato CANCELADO (rollback logico del plan).
//   4. finalizarPlan : cambia el estado a FINALIZADO.
//  Consistencia: SELECT ... FOR UPDATE bloquea el contrato mientras se opera sobre el.
// ============================================================================
import { PlanEntrenamiento } from '../models/plan_entrenamiento.js';
import { ContratoFactory } from '../factories/contrato_factory.js';
import { MovimientoFactory } from '../factories/movimiento_factory.js';
import { conTransaccion } from '../utils/transaccion.js';
import { ErrorNegocio } from '../utils/errores.js';

export const CATEGORIA_MENSUALIDAD = 'Mensualidad';

export class ServicioPlanes {
    constructor({ repoPlanes, repoContratos, repoClientes, repoFinanzas, repoSeguimiento }) {
        this.repoPlanes = repoPlanes;
        this.repoContratos = repoContratos;
        this.repoClientes = repoClientes;
        this.repoFinanzas = repoFinanzas;
        this.repoSeguimiento = repoSeguimiento;
    }

    // ---------- Planes ----------
    async crearPlan(datos) {
        const plan = new PlanEntrenamiento(datos);
        try {
            return await this.repoPlanes.crear(plan);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') throw new ErrorNegocio('Ya existe un plan con ese nombre.');
            throw e;
        }
    }

    listarPlanes() {
        return this.repoPlanes.listar();
    }

    listarContratosDeCliente(clienteId, opciones) {
        return this.repoContratos.listarPorCliente(clienteId, opciones);
    }

    // ---------- 1. ASIGNAR PLAN (CRITICA) ----------
    async asignarPlan({ clienteId, planId, fechaInicio }) {
        return conTransaccion(async (conexion) => {
            const cliente = await this.repoClientes.buscarPorId(clienteId, conexion);
            if (!cliente) throw new ErrorNegocio(`No existe el cliente #${clienteId}.`);
            if (!cliente.activo) throw new ErrorNegocio('No se puede asignar un plan a un cliente desactivado.');

            const plan = await this.repoPlanes.buscarPorId(planId, conexion);
            if (!plan) throw new ErrorNegocio(`No existe el plan #${planId}.`);

            const duplicado = await this.repoContratos.buscarActivoDeClienteYPlan(clienteId, planId, conexion);
            if (duplicado) throw new ErrorNegocio('El cliente ya tiene ese plan ACTIVO. Usa "Renew plan".');

            // El contrato se genera AUTOMATICAMENTE (Factory)
            const contrato = ContratoFactory.crear({ cliente_id: clienteId, plan, fecha_inicio: fechaInicio });
            const contratoId = await this.repoContratos.crear(contrato, conexion);

            // El pago se registra en la MISMA transaccion
            await this.#registrarPago(contrato, contratoId, plan.nombre_plan, 'Pago unico', conexion);

            return { contratoId, contrato: contrato.toJSON() };
        });
    }

    // ---------- 2. RENOVAR PLAN (CRITICA) ----------
    async renovarPlan(contratoId) {
        return conTransaccion(async (conexion) => {
            const anterior = await this.#contratoActivoBloqueado(contratoId, conexion, 'renovar');
            const plan = await this.repoPlanes.buscarPorId(anterior.plan_id, conexion);

            // El nuevo contrato empieza donde termina el anterior
            const nuevo = ContratoFactory.crear({
                cliente_id: anterior.cliente_id,
                plan,
                fecha_inicio: anterior.fecha_fin,
                contrato_origen_id: anterior.id
            });
            await this.repoContratos.cambiarEstado(anterior.id, 'RENOVADO', conexion);
            const nuevoId = await this.repoContratos.crear(nuevo, conexion);
            await this.#registrarPago(nuevo, nuevoId, plan.nombre_plan, 'Renovacion', conexion);

            return { contratoId: nuevoId, contrato: nuevo.toJSON() };
        });
    }

    // ---------- 3. CANCELAR PLAN (CRITICA) ----------
    // "Rollback del seguimiento y del contrato": se elimina el seguimiento fisico del contrato
    // y el contrato queda CANCELADO. Ambas cosas ocurren juntas o no ocurre ninguna.
    // (El contrato no se borra: queda como evidencia y el ingreso historico sigue cuadrando.)
    async cancelarPlan(contratoId) {
        return conTransaccion(async (conexion) => {
            const contrato = await this.#contratoActivoBloqueado(contratoId, conexion, 'cancelar');
            const registrosEliminados = await this.repoSeguimiento.eliminarPorContrato(contrato.id, conexion);
            await this.repoContratos.cambiarEstado(contrato.id, 'CANCELADO', conexion);
            return { registrosEliminados };
        });
    }

    // ---------- 4. FINALIZAR PLAN (CRITICA) ----------
    async finalizarPlan(contratoId) {
        return conTransaccion(async (conexion) => {
            const contrato = await this.#contratoActivoBloqueado(contratoId, conexion, 'finalizar');
            await this.repoContratos.cambiarEstado(contrato.id, 'FINALIZADO', conexion);
        });
    }

    // ---------- helpers privados ----------
    async #contratoActivoBloqueado(contratoId, conexion, accion) {
        const contrato = await this.repoContratos.buscarPorId(contratoId, conexion, { bloquear: true });
        if (!contrato) throw new ErrorNegocio(`No existe el contrato #${contratoId}.`);
        if (contrato.estado !== 'ACTIVO')
            throw new ErrorNegocio(`No se puede ${accion}: el contrato #${contratoId} esta ${contrato.estado}.`);
        return contrato;
    }

    async #registrarPago(contrato, contratoId, nombrePlan, motivo, conexion) {
        const categoria = await this.repoFinanzas.buscarCategoriaPorNombre(CATEGORIA_MENSUALIDAD, conexion);
        if (!categoria) throw new Error('Falta la categoria "Mensualidad" en la base de datos.');
        contrato.id = contratoId;   // ahora que el contrato ya tiene id, el ingreso puede referenciarlo
        const ingreso = MovimientoFactory.ingresoPorContrato(
            contrato, categoria.id, `${motivo} plan ${nombrePlan} (contrato #${contratoId})`);
        await this.repoFinanzas.crearMovimiento(ingreso, conexion);
    }
}
