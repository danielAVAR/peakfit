import { Modelo } from './modelo.js';

export const NIVELES = ['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO'];

export class PlanEntrenamiento extends Modelo {
    static esquema = {
        id:            { tipo: 'entero', min: 1 },
        nombre_plan:   { tipo: 'texto', requerido: true, largoMax: 100 },
        duracion_dias: { tipo: 'entero', requerido: true, min: 1, max: 730 },
        metas_fisicas: { tipo: 'texto', requerido: true },
        nivel:         { tipo: 'enum', requerido: true, valores: NIVELES },
        precio_base:   { tipo: 'decimal', requerido: true, min: 0, max: 99999999 }
    };
}
