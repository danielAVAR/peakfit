import { Modelo } from './modelo.js';

export class MovimientoFinanciero extends Modelo {
    static esquema = {
        id:           { tipo: 'entero', min: 1 },
        categoria_id: { tipo: 'entero', requerido: true, min: 1 },
        cliente_id:   { tipo: 'entero', min: 1 },
        contrato_id:  { tipo: 'entero', min: 1 },
        descripcion:  { tipo: 'texto', largoMax: 200 },
        monto:        { tipo: 'decimal', requerido: true, min: 0.01, max: 99999999 },
        fecha:        { tipo: 'fecha', requerido: true }
    };
}
