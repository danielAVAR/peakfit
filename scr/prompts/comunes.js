// Piezas reutilizables de los prompts (inquirer): validacion, selectores de cliente/contrato, pausa.
import inquirer from 'inquirer';
import dayjs from 'dayjs';
import { validarCampo } from '../validators/validador.js';
import { servicioClientes, servicioPlanes } from '../contenedor.js';
import { aviso } from '../utils/consola.js';

export const hoy = () => dayjs().format('YYYY-MM-DD');

// Convierte una regla del modelo en la funcion `validate` que inquirer entiende.
// Asi el usuario ve el error MIENTRAS escribe, con las mismas reglas del modelo.
export const validador = (nombre, regla) => (valor) => {
    try { validarCampo(nombre, valor, regla); return true; }
    catch (e) { return e.message; }
};

// Crea una pregunta de tipo "input" tomando la regla directamente del esquema de un modelo
export const preguntaModelo = (Modelo, campo, mensaje, extra = {}) => ({
    type: 'input', name: campo, message: mensaje,
    validate: validador(campo, Modelo.esquema[campo]), ...extra
});

export async function pausar() {
    await inquirer.prompt([{ type: 'input', name: 'continuar', message: 'Press ENTER to continue...' }]);
}

export async function confirmar(mensaje) {
    const { ok } = await inquirer.prompt([{ type: 'confirm', name: 'ok', message: mensaje, default: false }]);
    return ok;
}

export async function elegirCliente({ soloActivos = true } = {}) {
    const clientes = await servicioClientes.listar({ soloActivos });
    if (clientes.length === 0) { aviso('There are no clients yet.'); return null; }
    const { id } = await inquirer.prompt([{
        type: 'select', name: 'id', message: 'Select a client:',
        choices: clientes.map((c) => ({ name: `#${c.id}  ${c.nombre}  (${c.correo_electronico})`, value: c.id }))
    }]);
    return id;
}

export const etiquetaContrato = (c) =>
    `#${c.id}  ${c.nombre_plan} [${c.estado}]  ${c.fecha_inicio} -> ${c.fecha_fin}  $${Number(c.precio).toFixed(2)}`;

export async function elegirContrato(clienteId, { soloActivos = false } = {}) {
    const contratos = await servicioPlanes.listarContratosDeCliente(clienteId, { soloActivos });
    if (contratos.length === 0) {
        aviso(soloActivos ? 'This client has no ACTIVE contracts.' : 'This client has no contracts.');
        return null;
    }
    const { id } = await inquirer.prompt([{
        type: 'select', name: 'id', message: 'Select a contract:',
        choices: contratos.map((c) => ({ name: etiquetaContrato(c), value: c.id }))
    }]);
    return id;
}

// Atajo: cliente -> contrato en un solo paso
export async function elegirClienteYContrato({ soloActivos = false, clientesActivos = true } = {}) {
    const clienteId = await elegirCliente({ soloActivos: clientesActivos });
    if (!clienteId) return null;
    const contratoId = await elegirContrato(clienteId, { soloActivos });
    if (!contratoId) return null;
    return { clienteId, contratoId };
}
