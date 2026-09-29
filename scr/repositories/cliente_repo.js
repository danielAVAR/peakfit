import { RepositorioBase } from './repositorio_base.js';

export class ClienteRepositorio extends RepositorioBase {
    async crear(c, conexion) {
        const r = await this.ejecutar(
            `INSERT INTO cliente (nombre, fecha_nacimiento, telefono, correo_electronico)
             VALUES (?, ?, ?, ?)`,
            [c.nombre, c.fecha_nacimiento, c.telefono, c.correo_electronico], conexion);
        return r.insertId;
    }

    async listar({ soloActivos = false } = {}) {
        return this.ejecutar(
            `SELECT id, nombre, fecha_nacimiento, telefono, correo_electronico, activo
             FROM cliente ${soloActivos ? 'WHERE activo = 1' : ''} ORDER BY id DESC`);
    }

    async buscarPorId(id, conexion) {
        const filas = await this.ejecutar(`SELECT * FROM cliente WHERE id = ?`, [id], conexion);
        return filas[0] ?? null;
    }

    async actualizar(id, c, conexion) {
        const r = await this.ejecutar(
            `UPDATE cliente SET nombre = ?, fecha_nacimiento = ?, telefono = ?,
                    correo_electronico = ?, activo = ? WHERE id = ?`,
            [c.nombre, c.fecha_nacimiento, c.telefono, c.correo_electronico, c.activo ? 1 : 0, id], conexion);
        return r.affectedRows;
    }

    async desactivar(id, conexion) {
        const r = await this.ejecutar(`UPDATE cliente SET activo = 0 WHERE id = ?`, [id], conexion);
        return r.affectedRows;
    }
}
