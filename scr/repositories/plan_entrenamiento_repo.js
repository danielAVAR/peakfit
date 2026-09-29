import { RepositorioBase } from './repositorio_base.js';

export class PlanEntrenamientoRepositorio extends RepositorioBase {
    async crear(p, conexion) {
        const r = await this.ejecutar(
            `INSERT INTO plan_entrenamiento (nombre_plan, duracion_dias, metas_fisicas, nivel, precio_base)
             VALUES (?, ?, ?, ?, ?)`,
            [p.nombre_plan, p.duracion_dias, p.metas_fisicas, p.nivel, p.precio_base], conexion);
        return r.insertId;
    }

    async listar() {
        return this.ejecutar(`SELECT * FROM plan_entrenamiento ORDER BY id`);
    }

    async buscarPorId(id, conexion) {
        const filas = await this.ejecutar(`SELECT * FROM plan_entrenamiento WHERE id = ?`, [id], conexion);
        return filas[0] ?? null;
    }
}
