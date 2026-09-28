export class MovimientoFinanciero {
    #id;
    #categoria_id;
    #cliente_id;
    #contrato_id;
    #descripcion;
    #monto;
    #fecha;

    constructor({
        id = null,
        categoria_id = null,
        cliente_id = null,
        contrato_id = null,
        descripcion = null,
        monto = null,
        fecha = null
    } = {}) {
        this.#id = id;
        this.categoria_id = categoria_id;
        this.cliente_id = cliente_id;
        this.contrato_id = contrato_id;
        this.descripcion = descripcion;
        this.monto = monto;
        this.fecha = fecha;
    }

    get id() {
        return this.#id;
    }

    get categoria_id() {
        return this.#categoria_id;
    }

    set categoria_id(value) {
        this.#categoria_id = value;
    }

    get cliente_id() {
        return this.#cliente_id;
    }

    set cliente_id(value) {
        this.#cliente_id = value;
    }

    get contrato_id() {
        return this.#contrato_id;
    }

    set contrato_id(value) {
        this.#contrato_id = value;
    }

    get descripcion() {
        return this.#descripcion;
    }

    set descripcion(value) {
        this.#descripcion = value;
    }

    get monto() {
        return this.#monto;
    }

    set monto(value) {
        this.#monto = value;
    }

    get fecha() {
        return this.#fecha;
    }

    set fecha(value) {
        this.#fecha = value;
    }
}