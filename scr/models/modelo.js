
import { validarCampo } from '../validators/validador.js';

export class Modelo {
    #datos = {};

    constructor(datos = {}) {
        const esquema = this.constructor.esquema;

        for (const campo of Object.keys(esquema)) {
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
            this[campo] = inicial; 
        }
        this.validarReglasCruzadas();
    }


    validarReglasCruzadas() {}

    toJSON() {
        return { ...this.#datos };
    }
}
