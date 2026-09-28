export class Contrato {
    #id;
    #cliente_id;
    #plan_id;
    #condiciones;
    #precio;
    #fecha_inicio;
    #fecha_fin;
    #estado;
    #contrato_origen_id;
    #created_at;

    constructor({
        id = null,
        cliente_id = null,
        plan_id = null,
        condiciones = null,
        precio = null,
        fecha_inicio = null,
        fecha_fin = null,
        estado = null,
        contrato_origen_id = null,
        created_at = null
    } = {}) {
        this.#id = id;
        this.cliente_id = cliente_id;
        this.plan_id = plan_id;
        this.condiciones = condiciones;
        this.precio = precio;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.estado = estado;
        this.contrato_origen_id = contrato_origen_id;
        this.created_at = created_at;
    }

    get id() {
        return this.#id;
    }

    get cliente_id() {
        return this.#cliente_id;
    }

    set cliente_id(value) {
        this.#cliente_id = value;
    }

    get plan_id() {
        return this.#plan_id;
    }

    set plan_id(value) {
        this.#plan_id = value;
    }

    get condiciones() {
        return this.#condiciones;
    }

    set condiciones(value) {
        this.#condiciones = value;
    }

    get precio() {
        return this.#precio;
    }

    set precio(value) {
        this.#precio = value;
    }

    get fecha_inicio() {
        return this.#fecha_inicio;
    }

    set fecha_inicio(value) {
        this.#fecha_inicio = value;
    }

    get fecha_fin() {
        return this.#fecha_fin;
    }

    set fecha_fin(value) {
        this.#fecha_fin = value;
    }

    get estado() {
        return this.#estado;
    }

    set estado(value) {
        this.#estado = value;
    }

    get contrato_origen_id() {
        return this.#contrato_origen_id;
    }

    set contrato_origen_id(value) {
        this.#contrato_origen_id = value;
    }

    get created_at() {
        return this.#created_at;
    }

    set created_at(value) {
        this.#created_at = value;
    }
}