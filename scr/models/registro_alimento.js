export class RegistroAlimento {
    #id;
    #plan_alimentacion_id;
    #alimento_id;
    #fecha;
    #tipo_comida;
    #cantidad;

    constructor({
        id = null,
        plan_alimentacion_id = null,
        alimento_id = null,
        fecha = null,
        tipo_comida = null,
        cantidad = null
    } = {}) {
        this.#id = id;
        this.plan_alimentacion_id = plan_alimentacion_id;
        this.alimento_id = alimento_id;
        this.fecha = fecha;
        this.tipo_comida = tipo_comida;
        this.cantidad = cantidad;
    }

    get id() {
        return this.#id;
    }

    get plan_alimentacion_id() {
        return this.#plan_alimentacion_id;
    }

    set plan_alimentacion_id(value) {
        this.#plan_alimentacion_id = value;
    }

    get alimento_id() {
        return this.#alimento_id;
    }

    set alimento_id(value) {
        this.#alimento_id = value;
    }

    get fecha() {
        return this.#fecha;
    }

    set fecha(value) {
        this.#fecha = value;
    }

    get tipo_comida() {
        return this.#tipo_comida;
    }

    set tipo_comida(value) {
        this.#tipo_comida = value;
    }

    get cantidad() {
        return this.#cantidad;
    }

    set cantidad(value) {
        this.#cantidad = value;
    }
}