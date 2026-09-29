import { RepositorioBase } from './repositorio_base.js';

export class NutricionRepositorio extends RepositorioBase {
    async crearPlan(p, conexion) {
        const r = await this.ejecutar(
            `INSERT INTO plan_alimentacion (contrato_id, nombre, descripcion) VALUES (?, ?, ?)`,
            [p.contrato_id, p.nombre, p.descripcion], conexion);
        return r.insertId;
    }

    async listarPlanesPorContrato(contratoId) {
        return this.ejecutar(`SELECT * FROM plan_alimentacion WHERE contrato_id = ? ORDER BY id`, [contratoId]);
    }

    async buscarPlanPorId(id, conexion) {
        const filas = await this.ejecutar(
            `SELECT pa.*, c.estado AS estado_contrato FROM plan_alimentacion pa
             JOIN contrato c ON c.id = pa.contrato_id WHERE pa.id = ?`, [id], conexion);
        return filas[0] ?? null;
    }

    async listarAlimentos() {
        return this.ejecutar(`SELECT * FROM alimento ORDER BY nombre`);
    }

    async crearAlimento(a, conexion) {
        const r = await this.ejecutar(
            `INSERT INTO alimento (nombre, unidad, calorias_por_unidad) VALUES (?, ?, ?)`,
            [a.nombre, a.unidad, a.calorias_por_unidad], conexion);
        return r.insertId;
    }

    async registrarAlimento(r, conexion) {
        const res = await this.ejecutar(
            `INSERT INTO registro_alimento (plan_alimentacion_id, alimento_id, fecha, tipo_comida, cantidad)
             VALUES (?, ?, ?, ?, ?)`,
            [r.plan_alimentacion_id, r.alimento_id, r.fecha, r.tipo_comida, r.cantidad], conexion);
        return res.insertId;
    }

    // Detalle de cada comida entre dos fechas, con calorias = cantidad * calorias_por_unidad
    async detalleEntreFechas(planId, desde, hasta) {
        return this.ejecutar(
            `SELECT r.fecha, r.tipo_comida, a.nombre AS alimento, r.cantidad, a.unidad,
                    ROUND(r.cantidad * a.calorias_por_unidad, 2) AS calorias
             FROM registro_alimento r JOIN alimento a ON a.id = r.alimento_id
             WHERE r.plan_alimentacion_id = ? AND r.fecha BETWEEN ? AND ?
             ORDER BY r.fecha, FIELD(r.tipo_comida,'DESAYUNO','ALMUERZO','CENA','SNACK')`,
            [planId, desde, hasta]);
    }
}
