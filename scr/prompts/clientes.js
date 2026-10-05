import inquirer from 'inquirer';
import { Cliente } from '../models/cliente.js';
import { servicioClientes } from '../contenedor.js';
import { exito, titulo, tabla } from '../utils/consola.js';
import { preguntaModelo, elegirCliente, confirmar } from './comunes.js';
import { asignarPlan } from './planes.js'


export async function crearCliente() {
    titulo('Create client');
    const respuestas = await inquirer.prompt([
        preguntaModelo(Cliente, 'nombre', 'Full name:'),
        preguntaModelo(Cliente, 'fecha_nacimiento', 'Birth date (YYYY-MM-DD):'),
        preguntaModelo(Cliente, 'telefono', 'Phone:'),
        preguntaModelo(Cliente, 'correo_electronico', 'Email:')
    ]);    
    const id = await servicioClientes.crear(respuestas);
    exito(`Client created with ID ${id}.`);

    const respuestas2 = await inquirer.prompt({
        type: 'rawlist',
        name: 'respuestas2',
        message: 'DESEAS AGREGAR PLAN?',
        choices: ["+ ASIGNAR", "+ SIN PLAN"]
    })

    if(respuestas2.respuestas2 === "+ ASIGNAR"){
        await asignarPlan()
    }else if (respuestas2.respuestas2 === "+ SIN PLAN"){
        console.log("ups")
    }
}

export async function listarClientes() {
    titulo('Clients');
    const clientes = await servicioClientes.listar();
    tabla(clientes.map((c) => ({
        ID: c.id, Name: c.nombre, Birth: c.fecha_nacimiento, Phone: c.telefono,
        Email: c.correo_electronico, Active: c.activo ? 'yes' : 'no'
    })));
}

export async function actualizarCliente() {
    titulo('Update client');
    const id = await elegirCliente({ soloActivos: false });
    if (!id) return;
    const actual = await servicioClientes.obtener(id);
    const cambios = await inquirer.prompt([
        preguntaModelo(Cliente, 'nombre', 'Full name:', { default: actual.nombre }),
        preguntaModelo(Cliente, 'fecha_nacimiento', 'Birth date (YYYY-MM-DD):', { default: actual.fecha_nacimiento }),
        preguntaModelo(Cliente, 'telefono', 'Phone:', { default: actual.telefono }),
        preguntaModelo(Cliente, 'correo_electronico', 'Email:', { default: actual.correo_electronico })
    ]);
    await servicioClientes.actualizar(id, cambios);
    exito('Client updated.');
}

export async function desactivarCliente() {
    titulo('Deactivate client');
    const id = await elegirCliente();
    if (!id) return;
    if (!(await confirmar('Deactivate this client? (history is kept)'))) return;
    await servicioClientes.desactivar(id);
    exito('Client deactivated.');
}

export async function respaldarClientes() {
    titulo('Backup clients');
    const id = await elegirCliente();
    if (!id) return;
    if (!(await confirmar('choose this client?'))) return;
    await servicioClientes.respaldar(id);
}
