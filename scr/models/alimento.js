export class Alimento {
    #id;
    #nombre;
    #unidad;
    #calorias_por_unidad;

    constructor({
        id = null,
        nombre = null,
        unidad = null,
        calorias_por_unidad = null
    } = {}) {
        this.#id = id;
        this.nombre = nombre;
        this.unidad = unidad;
        this.calorias_por_unidad = calorias_por_unidad;
    }

    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(value) {
        this.#nombre = value;
    }

    get unidad() {
        return this.#unidad;
    }

    set unidad(value) {
        this.#unidad = value;
    }

    get calorias_por_unidad() {
        return this.#calorias_por_unidad;
    }

    set calorias_por_unidad(value) {
        this.#calorias_por_unidad = value;
    }
}