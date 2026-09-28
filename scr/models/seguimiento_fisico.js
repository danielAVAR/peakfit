export class SeguimientoFisico {
    #id;
    #contrato_id;
    #fecha;
    #peso_kg;
    #grasa_corporal;
    #cintura_cm;
    #pecho_cm;
    #cadera_cm;
    #brazo_cm;
    #muslo_cm;
    #comentarios;
    #puntaje;

    constructor({
        id = null,
        contrato_id = null,
        fecha = null,
        peso_kg = null,
        grasa_corporal = null,
        cintura_cm = null,
        pecho_cm = null,
        cadera_cm = null,
        brazo_cm = null,
        muslo_cm = null,
        comentarios = null,
        puntaje = null
    } = {}) {
        this.#id = id;
        this.contrato_id = contrato_id;
        this.fecha = fecha;
        this.peso_kg = peso_kg;
        this.grasa_corporal = grasa_corporal;
        this.cintura_cm = cintura_cm;
        this.pecho_cm = pecho_cm;
        this.cadera_cm = cadera_cm;
        this.brazo_cm = brazo_cm;
        this.muslo_cm = muslo_cm;
        this.comentarios = comentarios;
        this.puntaje = puntaje;
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

    get fecha() {
        return this.#fecha;
    }

    set fecha(value) {
        this.#fecha = value;
    }

    get peso_kg() {
        return this.#peso_kg;
    }

    set peso_kg(value) {
        this.#peso_kg = value;
    }

    get grasa_corporal() {
        return this.#grasa_corporal;
    }

    set grasa_corporal(value) {
        this.#grasa_corporal = value;
    }

    get cintura_cm() {
        return this.#cintura_cm;
    }

    set cintura_cm(value) {
        this.#cintura_cm = value;
    }

    get pecho_cm() {
        return this.#pecho_cm;
    }

    set pecho_cm(value) {
        this.#pecho_cm = value;
    }

    get cadera_cm() {
        return this.#cadera_cm;
    }

    set cadera_cm(value) {
        this.#cadera_cm = value;
    }

    get brazo_cm() {
        return this.#brazo_cm;
    }

    set brazo_cm(value) {
        this.#brazo_cm = value;
    }

    get muslo_cm() {
        return this.#muslo_cm;
    }

    set muslo_cm(value) {
        this.#muslo_cm = value;
    }

    get comentarios() {
        return this.#comentarios;
    }

    set comentarios(value) {
        this.#comentarios = value;
    }

    get puntaje() {
        return this.#puntaje;
    }

    set puntaje(value) {
        this.#puntaje = value;
    }
}