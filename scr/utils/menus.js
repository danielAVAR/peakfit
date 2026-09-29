
import inquirer from 'inquirer';
import chalk from 'chalk';
import { ErrorValidacion } from '../validators/validador.js';
import { ErrorNegocio } from './errores.js';
import { error } from './consola.js';
import { pausar } from '../prompts/comunes.js';
import * as clientes from '../prompts/clientes.js';
import * as planes from '../prompts/planes.js';
import * as seguimiento from '../prompts/seguimiento.js';
import * as nutricion from '../prompts/nutricion.js';
import * as finanzas from '../prompts/finanzas.js';

const banner = (texto, cara = ':D') => chalk.cyan(`
        ╔══════════════════════════════════════╗
        ║                                      ║
        ║              \\ ${cara.padEnd(2)}  /                 ║
        ║               \\ | /                  ║
        ║        ════════\\|/════════           ║
        ║                / \\                   ║
        ║               /   \\                  ║
        ║                                      ║
        ║${texto.padStart(19 + Math.floor(texto.length / 2)).padEnd(38)}║
        ║                                      ║
        ╚══════════════════════════════════════╝`);


async function ejecutar(accion) {
    try {
        await accion();
    } catch (e) {
        if (e.name === 'ExitPromptError') throw e;           
        if (e instanceof ErrorValidacion || e instanceof ErrorNegocio) error(e.message);
        else error(`Unexpected error: ${e.message}`);
    }
    await pausar();
}

async function correrMenu(textoBanner, cara, opciones) {
    while (true) {
        const { indice } = await inquirer.prompt([{
            type: 'select', name: 'indice', message: banner(textoBanner, cara) + '\n',
            choices: [
                ...opciones.map((o, i) => ({ name: `+  ${o.nombre}`, value: i })),
                { name: '+  BACK', value: -1 }
            ]
        }]);
        if (indice === -1) return;
        await ejecutar(opciones[indice].accion);
    }
}

const menu_clientes = () => correrMenu('C L I E N T S', ':>', [
    { nombre: 'CREATE CLIENT',     accion: clientes.crearCliente },
    { nombre: 'LIST CLIENTS',      accion: clientes.listarClientes },
    { nombre: 'UPDATE CLIENT',     accion: clientes.actualizarCliente },
    { nombre: 'DEACTIVATE CLIENT', accion: clientes.desactivarCliente }
]);

const menu_entrenamiento = () => correrMenu('T R A I N I N G', ':D', [
    { nombre: 'CREATE PLAN',              accion: planes.crearPlan },
    { nombre: 'LIST PLANS',               accion: planes.listarPlanes },
    { nombre: 'ASSIGN PLAN TO CLIENT',    accion: planes.asignarPlan },
    { nombre: 'LIST CLIENT CONTRACTS',    accion: planes.listarContratos },
    { nombre: 'RENEW PLAN',               accion: planes.renovarPlan },
    { nombre: 'CANCEL PLAN',              accion: planes.cancelarPlan },
    { nombre: 'FINISH PLAN',              accion: planes.finalizarPlan }
]);

const menu_progreso = () => correrMenu('P R O G R E S S', ':)', [
    { nombre: 'REGISTER WEEKLY PROGRESS', accion: seguimiento.registrarAvance },
    { nombre: 'VIEW PROGRESS',            accion: seguimiento.verProgreso },
    { nombre: 'DELETE PROGRESS RECORD',   accion: seguimiento.eliminarRegistro }
]);

const menu_nutricion = () => correrMenu('N U T R I T I O N', ':P', [
    { nombre: 'CREATE FOOD PLAN',    accion: nutricion.crearPlanAlimentacion },
    { nombre: 'REGISTER FOODS',      accion: nutricion.registrarAlimentos },
    { nombre: 'ADD FOOD TO CATALOG', accion: nutricion.crearAlimento },
    { nombre: 'WEEKLY REPORT',       accion: nutricion.reporteSemanal }
]);

const menu_balance = () => correrMenu('B A L A N C E', '$_$', [
    { nombre: 'REGISTER INCOME (INDIVIDUAL SESSION)', accion: finanzas.registrarSesionIndividual },
    { nombre: 'REGISTER EXPENSE',                     accion: finanzas.registrarEgreso },
    { nombre: 'VIEW BALANCE',                         accion: finanzas.consultarBalance }
]);

async function main_menu() {
    while (true) {
        const { opcion } = await inquirer.prompt([{
            type: 'select', name: 'opcion', message: banner('M   E   N   U') + '\n',
            choices: [
                { name: '+  PROGRESS',       value: menu_progreso },
                { name: '+  NUTRITION',      value: menu_nutricion },
                { name: '+  TRAINING PLANS', value: menu_entrenamiento },
                { name: '+  CLIENTS',        value: menu_clientes },
                { name: '+  BALANCE',        value: menu_balance },
                { name: '+  EXIT',           value: null }
            ]
        }]);
        if (opcion === null) return;
        await opcion();
    }
}

export async function menu_start() {
    const { empezar } = await inquirer.prompt([{
        type: 'confirm', name: 'empezar', default: true,
        message: banner('P E A K F I T', 'O ') + '\n\n        START?'
    }]);
    if (!empezar) return console.log('CLOSING');
    await main_menu();
    console.log(chalk.cyan('\nSee you next time! 💪'));
}
