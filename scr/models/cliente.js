export class Cliente {
    #id;
    #nombre;
    #fecha_nacimiento;
    #telefono;
    #correo_electronico;
    #activo;
    #created_at;

    constructor({
        id = null,
        nombre = null,
        fecha_nacimiento = null,
        telefono = null,
        correo_electronico = null,
        activo = null,
        created_at = null
    } = {}) {
        this.#id = id;
        this.nombre = nombre;
        this.fecha_nacimiento = fecha_nacimiento;
        this.telefono = telefono;
        this.correo_electronico = correo_electronico;
        this.activo = activo;
        this.created_at = created_at;
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

    get fecha_nacimiento() {
        return this.#fecha_nacimiento;
    }

    set fecha_nacimiento(value) {
        this.#fecha_nacimiento = value;
    }

    get telefono() {
        return this.#telefono;
    }

    set telefono(value) {
        this.#telefono = value;
    }

    get correo_electronico() {
        return this.#correo_electronico;
    }

    set correo_electronico(value) {
        this.#correo_electronico = value;
    }

    get activo() {
        return this.#activo;
    }

    set activo(value) {
        this.#activo = value;
    }

    get created_at() {
        return this.#created_at;
    }

    set created_at(value) {
        this.#created_at = value;
    }
}