import { RepositorioBase } from './repositorio_base.js';

export class FinanzasRepositorio extends RepositorioBase {
    async crearMovimiento(m, conexion) {
        const r = await this.ejecutar(
            `INSERT INTO movimiento_financiero (categoria_id, cliente_id, contrato_id, descripcion, monto, fecha)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [m.categoria_id, m.cliente_id, m.contrato_id, m.descripcion, m.monto, m.fecha], conexion);
        return r.insertId;
    }

    async buscarCategoriaPorNombre(nombre, conexion) {
        const filas = await this.ejecutar(`SELECT * FROM categoria_movimiento WHERE nombre = ?`, [nombre], conexion);
        return filas[0] ?? null;
    }

    async buscarCategoriaPorId(id, conexion) {
        const filas = await this.ejecutar(`SELECT * FROM categoria_movimiento WHERE id = ?`, [id], conexion);
        return filas[0] ?? null;
    }

    async listarCategorias(tipo) {
        return this.ejecutar(`SELECT * FROM categoria_movimiento WHERE tipo = ? ORDER BY id`, [tipo]);
    }

    // Filtros opcionales (desde / hasta / cliente). Se arma el WHERE solo con lo que venga.
    async listarMovimientos({ desde, hasta, clienteId } = {}) {
        const { where, params } = this.#filtros({ desde, hasta, clienteId });
        return this.ejecutar(
            `SELECT m.id, m.fecha, cat.tipo, cat.nombre AS categoria, m.descripcion, m.monto, m.cliente_id
             FROM movimiento_financiero m JOIN categoria_movimiento cat ON cat.id = m.categoria_id
             ${where} ORDER BY m.fecha DESC, m.id DESC`, params);
    }

    async totalesPorTipo({ desde, hasta, clienteId } = {}) {
        const { where, params } = this.#filtros({ desde, hasta, clienteId });
        return this.ejecutar(
            `SELECT cat.tipo, COALESCE(SUM(m.monto), 0) AS total
             FROM movimiento_financiero m JOIN categoria_movimiento cat ON cat.id = m.categoria_id
             ${where} GROUP BY cat.tipo`, params);
    }

    #filtros({ desde, hasta, clienteId }) {
        const condiciones = [];
        const params = [];
        if (desde)     { condiciones.push('m.fecha >= ?');   params.push(desde); }
        if (hasta)     { condiciones.push('m.fecha <= ?');   params.push(hasta); }
        if (clienteId) { condiciones.push('m.cliente_id = ?'); params.push(clienteId); }
        return { where: condiciones.length ? 'WHERE ' + condiciones.join(' AND ') : '', params };
    }
}
