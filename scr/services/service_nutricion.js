// SERVICIO DE NUTRICION
import dayjs from 'dayjs';
import { PlanAlimentacion } from '../models/plan_alimentacion.js';
import { Alimento } from '../models/alimento.js';
import { RegistroAlimento } from '../models/registro_alimento.js';
import { conTransaccion } from '../utils/transaccion.js';
import { ErrorNegocio } from '../utils/errores.js';
import { ErrorValidacion } from '../validators/validador.js';

export class ServicioNutricion {
    constructor({ repoNutricion, repoContratos }) {
        this.repoNutricion = repoNutricion;
        this.repoContratos = repoContratos;
    }

    async crearPlanAlimentacion(datos) {
        const plan = new PlanAlimentacion(datos);
        return conTransaccion(async (conexion) => {
            const contrato = await this.repoContratos.buscarPorId(plan.contrato_id, conexion, { bloquear: true });
            if (!contrato) throw new ErrorNegocio(`No existe el contrato #${plan.contrato_id}.`);
            if (contrato.estado !== 'ACTIVO') throw new ErrorNegocio('Solo se crean planes de alimentacion en contratos ACTIVOS.');
            return this.repoNutricion.crearPlan(plan, conexion);
        });
    }

    listarPlanesDeContrato(contratoId) {
        return this.repoNutricion.listarPlanesPorContrato(contratoId);
    }

    listarAlimentos() {
        return this.repoNutricion.listarAlimentos();
    }

    async crearAlimento(datos) {
        const alimento = new Alimento(datos);
        try {
            return await this.repoNutricion.crearAlimento(alimento);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') throw new ErrorNegocio('Ya existe un alimento con ese nombre.');
            throw e;
        }
    }

    async registrarAlimentoDia(datos) {
        const registro = new RegistroAlimento(datos);
        return conTransaccion(async (conexion) => {
            const plan = await this.repoNutricion.buscarPlanPorId(registro.plan_alimentacion_id, conexion);
            if (!plan) throw new ErrorNegocio('El plan de alimentacion no existe.');
            if (plan.estado_contrato !== 'ACTIVO') throw new ErrorNegocio('El contrato de este plan ya no esta ACTIVO.');
            return this.repoNutricion.registrarAlimento(registro, conexion);
        });
    }

    // Reporte de 7 dias 
    async reporteSemanal(planId, fechaInicio) {
        const inicio = dayjs(fechaInicio, 'YYYY-MM-DD', true);
        if (!inicio.isValid()) throw new ErrorValidacion('La fecha debe tener el formato YYYY-MM-DD.');
        const desde = inicio.format('YYYY-MM-DD');
        const hasta = inicio.add(6, 'day').format('YYYY-MM-DD');

        const detalle = await this.repoNutricion.detalleEntreFechas(planId, desde, hasta);

        const porDia = {};
        for (let i = 0; i < 7; i++) porDia[inicio.add(i, 'day').format('YYYY-MM-DD')] = 0;
        for (const fila of detalle) porDia[fila.fecha] = Number((porDia[fila.fecha] + fila.calorias).toFixed(2));

        const total = Object.values(porDia).reduce((a, b) => a + b, 0);
        return {
            desde, hasta, detalle,
            resumenPorDia: Object.entries(porDia).map(([fecha, calorias]) => ({ fecha, calorias })),
            totalCalorias: Number(total.toFixed(2)),
            promedioDiario: Number((total / 7).toFixed(2))
        };
    }
}
