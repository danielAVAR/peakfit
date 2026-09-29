import inquirer from 'inquirer';
import { PlanAlimentacion } from '../models/plan_alimentacion.js';
import { Alimento } from '../models/alimento.js';
import { RegistroAlimento, TIPOS_COMIDA } from '../models/registro_alimento.js';
import { servicioNutricion } from '../contenedor.js';
import { exito, titulo, tabla, info, aviso } from '../utils/consola.js';
import { preguntaModelo, elegirClienteYContrato, confirmar, validador, hoy } from './comunes.js';
import dayjs from 'dayjs';

async function elegirPlanAlimentacion(contratoId) {
    const planes = await servicioNutricion.listarPlanesDeContrato(contratoId);
    if (planes.length === 0) { aviso('This contract has no food plans yet.'); return null; }
    const { id } = await inquirer.prompt([{
        type: 'select', name: 'id', message: 'Select a food plan:',
        choices: planes.map((p) => ({ name: `#${p.id}  ${p.nombre}`, value: p.id }))
    }]);
    return id;
}

export async function crearPlanAlimentacion() {
    titulo('Create food plan');
    const sel = await elegirClienteYContrato({ soloActivos: true });
    if (!sel) return;
    const r = await inquirer.prompt([
        preguntaModelo(PlanAlimentacion, 'nombre', 'Food plan name:'),
        preguntaModelo(PlanAlimentacion, 'descripcion', 'Description (optional):')
    ]);
    const id = await servicioNutricion.crearPlanAlimentacion({ ...r, contrato_id: sel.contratoId });
    exito(`Food plan #${id} created.`);
}

export async function crearAlimento() {
    titulo('Add food to catalog');
    const r = await inquirer.prompt([
        preguntaModelo(Alimento, 'nombre', 'Food name:'),
        preguntaModelo(Alimento, 'unidad', 'Unit (e.g. unit, 100g, cup):'),
        preguntaModelo(Alimento, 'calorias_por_unidad', 'Calories per unit:')
    ]);
    const id = await servicioNutricion.crearAlimento(r);
    exito(`Food #${id} added.`);
}

// Registra alimentos de un dia; permite agregar varios seguidos
export async function registrarAlimentos() {
    titulo('Register foods by day');
    const sel = await elegirClienteYContrato({ soloActivos: true });
    if (!sel) return;
    const planId = await elegirPlanAlimentacion(sel.contratoId);
    if (!planId) return;
    const alimentos = await servicioNutricion.listarAlimentos();
    if (alimentos.length === 0) return aviso('The food catalog is empty. Add a food first.');

    let otro = true;
    while (otro) {
        const r = await inquirer.prompt([
            { type: 'select', name: 'alimento_id', message: 'Food:',
              choices: alimentos.map((a) => ({ name: `${a.nombre} (${a.calorias_por_unidad} kcal / ${a.unidad})`, value: a.id })) },
            preguntaModelo(RegistroAlimento, 'fecha', 'Date (YYYY-MM-DD):', { default: hoy() }),
            { type: 'select', name: 'tipo_comida', message: 'Meal:', choices: TIPOS_COMIDA },
            preguntaModelo(RegistroAlimento, 'cantidad', 'Quantity (in the food unit):')
        ]);
        await servicioNutricion.registrarAlimentoDia({ ...r, plan_alimentacion_id: planId });
        exito('Food registered.');
        otro = await confirmar('Register another food?');
    }
}

export async function reporteSemanal() {
    titulo('Weekly nutrition report');
    const sel = await elegirClienteYContrato({ soloActivos: false });
    if (!sel) return;
    const planId = await elegirPlanAlimentacion(sel.contratoId);
    if (!planId) return;
    const { inicio } = await inquirer.prompt([{
        type: 'input', name: 'inicio', message: 'First day of the week (YYYY-MM-DD):',
        default: dayjs().subtract(6, 'day').format('YYYY-MM-DD'),
        validate: validador('fecha', { tipo: 'fecha', requerido: true })
    }]);
    const r = await servicioNutricion.reporteSemanal(planId, inicio);
    info(`\nWeek ${r.desde} -> ${r.hasta}`);
    tabla(r.detalle.map((d) => ({ Date: d.fecha, Meal: d.tipo_comida, Food: d.alimento, Qty: `${d.cantidad} ${d.unidad}`, Calories: d.calorias })),
        'No foods registered in that week.');
    tabla(r.resumenPorDia.map((d) => ({ Date: d.fecha, 'Total kcal': d.calorias })));
    exito(`Total: ${r.totalCalorias} kcal   |   Daily average: ${r.promedioDiario} kcal`);
}
