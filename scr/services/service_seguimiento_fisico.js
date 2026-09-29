
import dayjs from 'dayjs';
import { SeguimientoFisico } from '../models/seguimiento_fisico.js';
import { FotoSeguimiento } from '../models/foto_seguimiento.js';
import { conTransaccion } from '../utils/transaccion.js';
import { ErrorNegocio } from '../utils/errores.js';

export class ServicioSeguimiento {
    constructor({ repoSeguimiento, repoContratos }) {
        this.repoSeguimiento = repoSeguimiento;
        this.repoContratos = repoContratos;
    }

    async registrarAvance(datos, urlsFotos = []) {
        const seguimiento = new SeguimientoFisico(datos);
        const fotos = urlsFotos.map((url) => new FotoSeguimiento({ url }));   // valida cada URL antes de tocar la BD

        return conTransaccion(async (conexion) => {
            const contrato = await this.repoContratos.buscarPorId(seguimiento.contrato_id, conexion, { bloquear: true });
            if (!contrato) throw new ErrorNegocio(`No existe el contrato #${seguimiento.contrato_id}.`);
            if (contrato.estado !== 'ACTIVO')
                throw new ErrorNegocio(`Solo se registran avances en contratos ACTIVOS (este esta ${contrato.estado}).`);
            if (dayjs(seguimiento.fecha).isBefore(dayjs(contrato.fecha_inicio), 'day'))
                throw new ErrorNegocio(`La fecha no puede ser anterior al inicio del contrato (${contrato.fecha_inicio}).`);

            let id;
            try {
                id = await this.repoSeguimiento.crear(seguimiento, conexion);
            } catch (e) {
                if (e.code === 'ER_DUP_ENTRY') throw new ErrorNegocio('Ya existe un registro para esa fecha en este contrato.');
                throw e;
            }
            for (const foto of fotos) {
                foto.seguimiento_id = id;
                await this.repoSeguimiento.agregarFoto(foto, conexion);
            }
            return id;
        });
    }

    // Progreso en orden cronologico + resumen de cambio (primer registro vs ultimo)
    async verProgreso(contratoId) {
        const registros = await this.repoSeguimiento.listarPorContrato(contratoId);
        let resumen = null;
        if (registros.length >= 2) {
            const primero = registros[0];
            const ultimo = registros[registros.length - 1];
            resumen = {
                desde: primero.fecha,
                hasta: ultimo.fecha,
                cambioPesoKg: Number((ultimo.peso_kg - primero.peso_kg).toFixed(2)),
                cambioGrasa: (primero.grasa_corporal != null && ultimo.grasa_corporal != null)
                    ? Number((ultimo.grasa_corporal - primero.grasa_corporal).toFixed(1)) : null
            };
        }
        return { registros, resumen };
    }

    async eliminarRegistro(seguimientoId) {
        return conTransaccion(async (conexion) => {
            const registro = await this.repoSeguimiento.buscarPorId(seguimientoId, conexion);
            if (!registro) throw new ErrorNegocio(`No existe el registro #${seguimientoId}.`);

            const contrato = await this.repoContratos.buscarPorId(registro.contrato_id, conexion, { bloquear: true });
            if (contrato.estado !== 'ACTIVO')
                throw new ErrorNegocio(`No se puede eliminar: el contrato esta ${contrato.estado} y su historial debe conservarse.`);

            await this.repoSeguimiento.eliminar(seguimientoId, conexion);
        });
    }
}
