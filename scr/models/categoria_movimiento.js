import { Modelo } from './modelo.js';

export class CategoriaMovimiento extends Modelo {
    static esquema = {
        id:     { tipo: 'entero', min: 1 },
        nombre: { tipo: 'texto', requerido: true, largoMax: 40 },
        tipo:   { tipo: 'enum', requerido: true, valores: ['INGRESO', 'EGRESO'] }
    };
}
