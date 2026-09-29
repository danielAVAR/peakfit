import { Modelo } from './modelo.js';

export class FotoSeguimiento extends Modelo {
    static esquema = {
        id:             { tipo: 'entero', min: 1 },
        seguimiento_id: { tipo: 'entero', min: 1 },
        url:            { tipo: 'url', requerido: true, largoMax: 255 }
    };
}
