import { Modelo } from './modelo.js';

export class PlanAlimentacion extends Modelo {
    static esquema = {
        id:          { tipo: 'entero', min: 1 },
        contrato_id: { tipo: 'entero', requerido: true, min: 1 },
        nombre:      { tipo: 'texto', requerido: true, largoMax: 100 },
        descripcion: { tipo: 'texto' }
    };
}
