import { Modelo } from './modelo.js';
import { ErrorValidacion } from '../validators/validador.js';

export const ESTADOS_CONTRATO = ['ACTIVO', 'RENOVADO', 'CANCELADO', 'FINALIZADO'];

export class Contrato extends Modelo {
    static esquema = {
        id:                 { tipo: 'entero', min: 1 },
        cliente_id:         { tipo: 'entero', requerido: true, min: 1 },
        plan_id:            { tipo: 'entero', requerido: true, min: 1 },
        condiciones:        { tipo: 'texto', requerido: true },
        precio:             { tipo: 'decimal', requerido: true, min: 0 },
        fecha_inicio:       { tipo: 'fecha', requerido: true },
        fecha_fin:          { tipo: 'fecha', requerido: true },
        estado:             { tipo: 'enum', valores: ESTADOS_CONTRATO, porDefecto: 'ACTIVO' },
        contrato_origen_id: { tipo: 'entero', min: 1 },
        created_at:         { tipo: 'texto' }
    };

    // Regla que involucra dos campos (igual que el CHECK del SQL)
    validarReglasCruzadas() {
        if (this.fecha_fin <= this.fecha_inicio)
            throw new ErrorValidacion('La fecha fin del contrato debe ser posterior a la fecha de inicio.');
    }
}
