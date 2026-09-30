export class ErrorNegocio extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = 'ErrorNegocio';
    }
}
