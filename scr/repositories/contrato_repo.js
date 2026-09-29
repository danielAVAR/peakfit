import { RepositorioBase } from './repositorio_base.js';

export class ContratoRepositorio extends RepositorioBase {
    async crear(c, conexion) {
        const r = await this.ejecutar(
            `INSERT INTO contrato (cliente_id, plan_id, condiciones, precio, fecha_inicio,
                                   fecha_fin, estado, contrato_origen_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [c.cliente_id, c.plan_id, c.condiciones, c.precio, c.fecha_inicio,
             c.fecha_fin, c.estado, c.contrato_origen_id], conexion);
        return r.insertId;
    }

 
    async buscarPorId(id, conexion, { bloquear = false } = {}) {
        const filas = await this.ejecutar(
            `SELECT * FROM contrato WHERE id = ? ${bloquear ? 'FOR UPDATE' : ''}`, [id], conexion);
        return filas[0] ?? null;
    }

    async buscarActivoDeClienteYPlan(clienteId, planId, conexion) {
        const filas = await this.ejecutar(
            `SELECT id FROM contrato WHERE cliente_id = ? AND plan_id = ? AND estado = 'ACTIVO'`,
            [clienteId, planId], conexion);
        return filas[0] ?? null;
    }

    async listarPorCliente(clienteId, { soloActivos = false } = {}) {
        return this.ejecutar(
            `SELECT c.id, p.nombre_plan, p.nivel, c.precio, c.fecha_inicio, c.fecha_fin, c.estado
             FROM contrato c JOIN plan_entrenamiento p ON p.id = c.plan_id
             WHERE c.cliente_id = ? ${soloActivos ? "AND c.estado = 'ACTIVO'" : ''}
             ORDER BY c.id DESC`, [clienteId]);
    }

    async cambiarEstado(id, estado, conexion) {
        const r = await this.ejecutar(`UPDATE contrato SET estado = ? WHERE id = ?`, [estado, id], conexion);
        return r.affectedRows;
    }
}
