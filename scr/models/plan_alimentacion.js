export class PlanAlimentacion {
    #id;
    #contrato_id;
    #nombre;
    #descripcion;

    constructor({
        id = null,
        contrato_id = null,
        nombre = null,
        descripcion = null
    } = {}) {
        this.#id = id;
        this.contrato_id = contrato_id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    get id() {
        return this.#id;
    }

    get contrato_id() {
        return this.#contrato_id;
    }

    set contrato_id(value) {
        this.#contrato_id = value;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(value) {
        this.#nombre = value;
    }

    get descripcion() {
        return this.#descripcion;
    }

    set descripcion(value) {
        this.#descripcion = value;
    }
}