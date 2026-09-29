import { Modelo } from './modelo.js';

export class Cliente extends Modelo {
    static esquema = {
        id:                 { tipo: 'entero', min: 1 },
        nombre:             { tipo: 'texto', requerido: true, largoMax: 100 },
        fecha_nacimiento:   { tipo: 'fecha', requerido: true, noFutura: true },
        telefono:           { tipo: 'telefono', requerido: true },
        correo_electronico: { tipo: 'correo', requerido: true },
        activo:             { tipo: 'booleano', porDefecto: true },
        created_at:         { tipo: 'texto' }
    };
}
