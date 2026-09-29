import inquirer from 'inquirer';
import chalk from 'chalk';
import { MovimientoFinanciero } from '../models/movimiento_financiero.js';
import { servicioFinanzas } from '../contenedor.js';
import { exito, titulo, tabla, dinero, aviso } from '../utils/consola.js';
import { preguntaModelo, elegirCliente, validador, hoy } from './comunes.js';

export async function registrarSesionIndividual() {
    titulo('Register income: individual session');
    const clienteId = await elegirCliente();
    if (!clienteId) return;
    const r = await inquirer.prompt([
        preguntaModelo(MovimientoFinanciero, 'monto', 'Amount ($):'),
        preguntaModelo(MovimientoFinanciero, 'fecha', 'Date (YYYY-MM-DD):', { default: hoy() }),
        preguntaModelo(MovimientoFinanciero, 'descripcion', 'Description (optional):')
    ]);
    const id = await servicioFinanzas.registrarSesionIndividual({ clienteId, ...r });
    exito(`Income #${id} registered.`);
}

export async function registrarEgreso() {
    titulo('Register expense');
    const categorias = await servicioFinanzas.listarCategorias('EGRESO');
    const r = await inquirer.prompt([
        { type: 'select', name: 'categoriaId', message: 'Category:', choices: categorias.map((c) => ({ name: c.nombre, value: c.id })) },
        preguntaModelo(MovimientoFinanciero, 'monto', 'Amount ($):'),
        preguntaModelo(MovimientoFinanciero, 'fecha', 'Date (YYYY-MM-DD):', { default: hoy() }),
        preguntaModelo(MovimientoFinanciero, 'descripcion', 'Description (optional):')
    ]);
    const id = await servicioFinanzas.registrarEgreso(r);
    exito(`Expense #${id} registered.`);
}

export async function consultarBalance() {
    titulo('Financial balance');
    const { modo } = await inquirer.prompt([{
        type: 'select', name: 'modo', message: 'Filter by:',
        choices: [{ name: 'Everything', value: 'todo' }, { name: 'Date range', value: 'fechas' }, { name: 'Client', value: 'cliente' }]
    }]);

    const filtros = {};
    if (modo === 'fechas') {
        const f = await inquirer.prompt([
            { type: 'input', name: 'desde', message: 'From (YYYY-MM-DD):', validate: validador('desde', { tipo: 'fecha', requerido: true }) },
            { type: 'input', name: 'hasta', message: 'To (YYYY-MM-DD):', default: hoy(), validate: validador('hasta', { tipo: 'fecha', requerido: true }) }
        ]);
        Object.assign(filtros, f);
    } else if (modo === 'cliente') {
        const id = await elegirCliente({ soloActivos: false });
        if (!id) return;
        filtros.clienteId = id;
    }

    const b = await servicioFinanzas.balance(filtros);
    tabla(b.movimientos.map((m) => ({
        ID: m.id, Date: m.fecha, Type: m.tipo, Category: m.categoria, Description: m.descripcion, Amount: dinero(m.monto)
    })), 'No movements found for that filter.');
    console.log(`\n  Income:   ${chalk.green(dinero(b.ingresos))}`);
    console.log(`  Expenses: ${chalk.red(dinero(b.egresos))}`);
    console.log(`  BALANCE:  ${(b.balance >= 0 ? chalk.bold.green : chalk.bold.red)(dinero(b.balance))}`);
}
