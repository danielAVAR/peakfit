import inquirer from 'inquirer';
import { crearCliente } from '../repositories/cliente_repo.js';

async function creacion_cliente() {

    const respuestas = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombre',
            message: '¿Cuál es el nombre del cliente?'
        },
        {
            type: 'input',
            name: 'fecha_nacimiento',
            message: '¿Cuál es la fecha de nacimiento? (YYYY-MM-DD)'
        },
        {
            type: 'input',
            name: 'telefono',
            message: '¿Cuál es el teléfono?'
        },
        {
            type: 'input',
            name: 'correo_electronico',
            message: '¿Cuál es el correo electrónico?'
        },

    ]);

    const resultado = await crearCliente(respuestas);

    console.log('Cliente creado correctamente.');
    console.log(`ID del cliente: ${resultado.insertId}`);
}

export { creacion_cliente };