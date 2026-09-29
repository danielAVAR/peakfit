// CLASE BASE DE TODOS LOS MODELOS
// Cada modelo hija declara su "esquema": un objeto JavaScript con las reglas de cada campo.
// Esta clase crea automaticamente un getter y un setter por campo, y el setter VALIDA
// antes de guardar. Asi es imposible tener un objeto con datos invalidos.
import { validarCampo } from '../validators/validador.js';

export class Modelo {
    #datos = {};

    constructor(datos = {}) {
        const esquema = this.constructor.esquema;

        for (const campo of Object.keys(esquema)) {
            // Getter y setter dinamicos para cada campo del esquema
            Object.defineProperty(this, campo, {
                enumerable: true,
                get: () => this.#datos[campo],
                set: (valor) => {
                    this.#datos[campo] = validarCampo(campo, valor, esquema[campo]);
                }
            });
        }
        for (const campo of Object.keys(esquema)) {
            const inicial = datos[campo] !== undefined ? datos[campo] : esquema[campo].porDefecto;
            this[campo] = inicial; // dispara el setter => valida
        }
        this.validarReglasCruzadas();
    }

    // Las clases hija pueden sobreescribir esto para reglas que involucran varios campos
    // (por ejemplo: fecha_fin > fecha_inicio).
    validarReglasCruzadas() {}

    toJSON() {
        return { ...this.#datos };
    }
}
