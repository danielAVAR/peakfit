export class CategoriaMovimiento {
    #id;
    #nombre;
    #tipo;

    constructor({
        id = null,
        nombre = null,
        tipo = null
    } = {}) {
        this.#id = id;
        this.nombre = nombre;
        this.tipo = tipo;
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

    get tipo() {
        return this.#tipo;
    }

    set tipo(value) {
        this.#tipo = value;
    }
}