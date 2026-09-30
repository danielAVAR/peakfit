// SERVICIO DE CLIENTES: reglas de negocio de clientes.
// Recibe su repositorio por el constructor (Inyeccion de Dependencias => principio DIP).
import { Cliente } from '../models/cliente.js';
import { ErrorNegocio } from '../utils/errores.js';

export class ServicioClientes {
    constructor(repoClientes) {
        this.repoClientes = repoClientes;
    }

    async crear(datos) {
        const cliente = new Cliente(datos);       
        try {
            return await this.repoClientes.crear(cliente);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') throw new ErrorNegocio('Ya existe un cliente con ese correo electronico.');
            throw e;
        }
    }

    listar(opciones) {
        return this.repoClientes.listar(opciones);
    }

    async obtener(id) {
        const cliente = await this.repoClientes.buscarPorId(id);
        if (!cliente) throw new ErrorNegocio(`No existe el cliente #${id}.`);
        return cliente;
    }

    // Actualiza solo lo que el usuario cambio; el resto se conserva.
    async actualizar(id, cambios) {
        const actual = await this.obtener(id);
        const cliente = new Cliente({ ...actual, ...cambios });   // vuelve a validar el resultado final
        try {
            await this.repoClientes.actualizar(id, cliente);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') throw new ErrorNegocio('Ese correo ya pertenece a otro cliente.');
            throw e;
        }
    }

    // Desactivacion (no borrado): conserva el historial de contratos, seguimiento y pagos.
    async desactivar(id) {
        const cliente = await this.obtener(id);
        if (!cliente.activo) throw new ErrorNegocio('El cliente ya estaba desactivado.');
        await this.repoClientes.desactivar(id);
    }
}
