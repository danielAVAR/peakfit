import { Modelo } from './modelo.js';

export class SeguimientoFisico extends Modelo {
    static esquema = {
        id:             { tipo: 'entero', min: 1 },
        contrato_id:    { tipo: 'entero', requerido: true, min: 1 },
        fecha:          { tipo: 'fecha', requerido: true, noFutura: true },
        peso_kg:        { tipo: 'decimal', requerido: true, min: 20, max: 500 },
        grasa_corporal: { tipo: 'decimal', min: 0, max: 100 },
        cintura_cm:     { tipo: 'decimal', min: 1, max: 300 },
        pecho_cm:       { tipo: 'decimal', min: 1, max: 300 },
        cadera_cm:      { tipo: 'decimal', min: 1, max: 300 },
        brazo_cm:       { tipo: 'decimal', min: 1, max: 100 },
        muslo_cm:       { tipo: 'decimal', min: 1, max: 200 },
        comentarios:    { tipo: 'texto' },
        puntuaje:       { tipo: 'entero', min: 1, max: 10 }
    };
}
