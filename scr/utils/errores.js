// Error para reglas de negocio (ej: "el cliente ya tiene ese plan activo").
// Se distingue de ErrorValidacion (dato mal escrito) y de errores inesperados (bugs / BD caida).
export class ErrorNegocio extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = 'ErrorNegocio';
    }
}
