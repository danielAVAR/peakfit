export class FotoSeguimiento {
    #id;
    #seguimiento_id;
    #url;

    constructor({
        id = null,
        seguimiento_id = null,
        url = null
    } = {}) {
        this.#id = id;
        this.seguimiento_id = seguimiento_id;
        this.url = url;
    }

    get id() {
        return this.#id;
    }

    get seguimiento_id() {
        return this.#seguimiento_id;
    }

    set seguimiento_id(value) {
        this.#seguimiento_id = value;
    }

    get url() {
        return this.#url;
    }

    set url(value) {
        this.#url = value;
    }
}