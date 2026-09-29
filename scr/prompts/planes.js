import inquirer from 'inquirer';
import { PlanEntrenamiento, NIVELES } from '../models/plan_entrenamiento.js';
import { servicioPlanes } from '../contenedor.js';
import { exito, titulo, tabla, info, dinero } from '../utils/consola.js';
import { preguntaModelo, elegirCliente, elegirContrato, elegirClienteYContrato, confirmar, validador, hoy } from './comunes.js';

export async function crearPlan() {
    titulo('Create training plan');
    const respuestas = await inquirer.prompt([
        preguntaModelo(PlanEntrenamiento, 'nombre_plan', 'Plan name:'),
        preguntaModelo(PlanEntrenamiento, 'duracion_dias', 'Duration (days):'),
        preguntaModelo(PlanEntrenamiento, 'metas_fisicas', 'Physical goals:'),
        { type: 'select', name: 'nivel', message: 'Level:', choices: NIVELES },
        preguntaModelo(PlanEntrenamiento, 'precio_base', 'Price ($):')
    ]);
    const id = await servicioPlanes.crearPlan(respuestas);
    exito(`Plan created with ID ${id}.`);
}

export async function listarPlanes() {
    titulo('Training plans');
    const planes = await servicioPlanes.listarPlanes();
    tabla(planes.map((p) => ({
        ID: p.id, Name: p.nombre_plan, Days: p.duracion_dias, Level: p.nivel,
        Price: dinero(p.precio_base), Goals: p.metas_fisicas
    })));
}

export async function asignarPlan() {
    titulo('Assign plan to client');
    const clienteId = await elegirCliente();
    if (!clienteId) return;
    const planes = await servicioPlanes.listarPlanes();
    if (planes.length === 0) return info('There are no plans yet. Create one first.');

    const { planId, fechaInicio } = await inquirer.prompt([
        { type: 'select', name: 'planId', message: 'Select a plan:',
          choices: planes.map((p) => ({ name: `#${p.id}  ${p.nombre_plan} (${p.nivel}, ${p.duracion_dias} days) ${dinero(p.precio_base)}`, value: p.id })) },
        { type: 'input', name: 'fechaInicio', message: 'Start date (YYYY-MM-DD):', default: hoy(),
          validate: validador('fecha_inicio', { tipo: 'fecha', requerido: true }) }
    ]);
    if (!(await confirmar('Confirm? A contract will be created and the full price charged.'))) return;

    const { contratoId, contrato } = await servicioPlanes.asignarPlan({ clienteId, planId, fechaInicio });
    exito(`Contract #${contratoId} generated automatically (${contrato.fecha_inicio} -> ${contrato.fecha_fin}).`);
    exito(`Payment of ${dinero(contrato.precio)} registered as income.`);
    info(`Conditions: ${contrato.condiciones}`);
}

export async function listarContratos() {
    titulo('Client contracts');
    const clienteId = await elegirCliente({ soloActivos: false });
    if (!clienteId) return;
    const contratos = await servicioPlanes.listarContratosDeCliente(clienteId);
    tabla(contratos.map((c) => ({
        Contract: c.id, Plan: c.nombre_plan, Level: c.nivel, Price: dinero(c.precio),
        Start: c.fecha_inicio, End: c.fecha_fin, Status: c.estado
    })), 'This client has no contracts.');
}

export async function renovarPlan() {
    titulo('Renew plan');
    const sel = await elegirClienteYContrato({ soloActivos: true });
    if (!sel) return;
    if (!(await confirmar('Renew? A new contract will start when this one ends and will be charged.'))) return;
    const { contratoId, contrato } = await servicioPlanes.renovarPlan(sel.contratoId);
    exito(`Renewed. New contract #${contratoId} (${contrato.fecha_inicio} -> ${contrato.fecha_fin}), ${dinero(contrato.precio)} charged.`);
}

export async function cancelarPlan() {
    titulo('Cancel plan');
    const sel = await elegirClienteYContrato({ soloActivos: true });
    if (!sel) return;
    if (!(await confirmar('Cancel? The physical tracking of this contract will be DELETED. This cannot be undone.'))) return;
    const { registrosEliminados } = await servicioPlanes.cancelarPlan(sel.contratoId);
    exito(`Contract cancelled. ${registrosEliminados} tracking record(s) rolled back.`);
}

export async function finalizarPlan() {
    titulo('Finish plan');
    const sel = await elegirClienteYContrato({ soloActivos: true });
    if (!sel) return;
    if (!(await confirmar('Mark this contract as FINISHED?'))) return;
    await servicioPlanes.finalizarPlan(sel.contratoId);
    exito('Contract finished.');
}
