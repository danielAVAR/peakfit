import { Modelo } from './modelo.js';

export const TIPOS_COMIDA = ['DESAYUNO', 'ALMUERZO', 'CENA', 'SNACK'];

export class RegistroAlimento extends Modelo {
    static esquema = {
        id:                   { tipo: 'entero', min: 1 },
        plan_alimentacion_id: { tipo: 'entero', requerido: true, min: 1 },
        alimento_id:          { tipo: 'entero', requerido: true, min: 1 },
        fecha:                { tipo: 'fecha', requerido: true },
        tipo_comida:          { tipo: 'enum', requerido: true, valores: TIPOS_COMIDA },
        cantidad:             { tipo: 'decimal', requerido: true, min: 0.01, max: 99999 }
    };
}
