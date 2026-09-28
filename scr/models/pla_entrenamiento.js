export class PlanEntrenamiento {
    #id;
    #nombre_plan;
    #duracion_dias;
    #metas_fisicas;
    #nivel;
    #precio_base;

    constructor({
        id = null,
        nombre_plan = null,
        duracion_dias = null,
        metas_fisicas = null,
        nivel = null,
        precio_base = null
    } = {}) {
        this.#id = id;
        this.nombre_plan = nombre_plan;
        this.duracion_dias = duracion_dias;
        this.metas_fisicas = metas_fisicas;
        this.nivel = nivel;
        this.precio_base = precio_base;
    }

    get id() {
        return this.#id;
    }

    get nombre_plan() {
        return this.#nombre_plan;
    }

    set nombre_plan(value) {
        this.#nombre_plan = value;
    }

    get duracion_dias() {
        return this.#duracion_dias;
    }

    set duracion_dias(value) {
        this.#duracion_dias = value;
    }

    get metas_fisicas() {
        return this.#metas_fisicas;
    }

    set metas_fisicas(value) {
        this.#metas_fisicas = value;
    }

    get nivel() {
        return this.#nivel;
    }

    set nivel(value) {
        this.#nivel = value;
    }

    get precio_base() {
        return this.#precio_base;
    }

    set precio_base(value) {
        this.#precio_base = value;
    }
}