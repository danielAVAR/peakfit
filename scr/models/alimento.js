import { Modelo } from './modelo.js';

export class Alimento extends Modelo {
    static esquema = {
        id:                  { tipo: 'entero', min: 1 },
        nombre:              { tipo: 'texto', requerido: true, largoMax: 100 },
        unidad:              { tipo: 'texto', requerido: true, largoMax: 20 },
        calorias_por_unidad: { tipo: 'decimal', requerido: true, min: 0, max: 10000 }
    };
}
