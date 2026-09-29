
import { MovimientoFinanciero } from '../models/movimiento_financiero.js';
import { conTransaccion } from '../utils/transaccion.js';
import { ErrorNegocio } from '../utils/errores.js';

export class ServicioFinanzas {
    constructor({ repoFinanzas, repoClientes }) {
        this.repoFinanzas = repoFinanzas;
        this.repoClientes = repoClientes;
    }

    listarCategorias(tipo) {
        return this.repoFinanzas.listarCategorias(tipo);
    }

    async registrarSesionIndividual({ clienteId, monto, fecha, descripcion }) {
        return conTransaccion(async (conexion) => {
            const cliente = await this.repoClientes.buscarPorId(clienteId, conexion);
            if (!cliente || !cliente.activo) throw new ErrorNegocio('El cliente no existe o esta desactivado.');
            const categoria = await this.repoFinanzas.buscarCategoriaPorNombre('Sesion individual', conexion);
            const mov = new MovimientoFinanciero({
                categoria_id: categoria.id, cliente_id: clienteId, monto, fecha,
                descripcion: descripcion || 'Sesion individual'
            });
            return this.repoFinanzas.crearMovimiento(mov, conexion);
        });
    }

    async registrarEgreso({ categoriaId, monto, fecha, descripcion }) {
        return conTransaccion(async (conexion) => {
            const categoria = await this.repoFinanzas.buscarCategoriaPorId(categoriaId, conexion);
            if (!categoria || categoria.tipo !== 'EGRESO') throw new ErrorNegocio('La categoria elegida no es un egreso.');
            const mov = new MovimientoFinanciero({ categoria_id: categoriaId, monto, fecha, descripcion });
            return this.repoFinanzas.crearMovimiento(mov, conexion);
        });
    }

    async balance(filtros = {}) {
        const totales = await this.repoFinanzas.totalesPorTipo(filtros);
        const ingresos = Number(totales.find((t) => t.tipo === 'INGRESO')?.total ?? 0);
        const egresos = Number(totales.find((t) => t.tipo === 'EGRESO')?.total ?? 0);
        const movimientos = await this.repoFinanzas.listarMovimientos(filtros);
        return { ingresos, egresos, balance: Number((ingresos - egresos).toFixed(2)), movimientos };
    }
}
