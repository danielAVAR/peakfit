import { RepositorioBase } from './repositorio_base.js';

export class SeguimientoRepositorio extends RepositorioBase {
    async crear(s, conexion) {
        const r = await this.ejecutar(
            `INSERT INTO seguimiento_fisico (contrato_id, fecha, peso_kg, grasa_corporal, cintura_cm,
                    pecho_cm, cadera_cm, brazo_cm, muslo_cm, comentarios, puntuaje)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [s.contrato_id, s.fecha, s.peso_kg, s.grasa_corporal, s.cintura_cm, s.pecho_cm,
             s.cadera_cm, s.brazo_cm, s.muslo_cm, s.comentarios, s.puntuaje], conexion);
        return r.insertId;
    }

    async agregarFoto(foto, conexion) {
        const r = await this.ejecutar(
            `INSERT INTO foto_seguimiento (seguimiento_id, url) VALUES (?, ?)`,
            [foto.seguimiento_id, foto.url], conexion);
        return r.insertId;
    }

    async listarPorContrato(contratoId) {
        return this.ejecutar(
            `SELECT s.id, s.fecha, s.peso_kg, s.grasa_corporal, s.cintura_cm, s.pecho_cm, s.cadera_cm,
                    s.brazo_cm, s.muslo_cm, s.puntuaje, s.comentarios,
                    (SELECT COUNT(*) FROM foto_seguimiento f WHERE f.seguimiento_id = s.id) AS fotos
             FROM seguimiento_fisico s WHERE s.contrato_id = ? ORDER BY s.fecha ASC`, [contratoId]);
    }

    async listarFotos(seguimientoId) {
        return this.ejecutar(`SELECT url FROM foto_seguimiento WHERE seguimiento_id = ?`, [seguimientoId]);
    }

    async buscarPorId(id, conexion) {
        const filas = await this.ejecutar(`SELECT * FROM seguimiento_fisico WHERE id = ?`, [id], conexion);
        return filas[0] ?? null;
    }

    async eliminar(id, conexion) {
        const r = await this.ejecutar(`DELETE FROM seguimiento_fisico WHERE id = ?`, [id], conexion);
        return r.affectedRows;
    }

    // Las fotos se borran solas (ON DELETE CASCADE en el SQL)
    async eliminarPorContrato(contratoId, conexion) {
        const r = await this.ejecutar(`DELETE FROM seguimiento_fisico WHERE contrato_id = ?`, [contratoId], conexion);
        return r.affectedRows;
    }
}
