import inquirer from 'inquirer';
import chalk from 'chalk';
import { SeguimientoFisico } from '../models/seguimiento_fisico.js';
import { servicioSeguimiento } from '../contenedor.js';
import { exito, titulo, tabla, info, aviso } from '../utils/consola.js';
import { preguntaModelo, elegirClienteYContrato, confirmar, validador, hoy } from './comunes.js';

const opcional = (campo, mensaje) => preguntaModelo(SeguimientoFisico, campo, `${mensaje} (optional):`);

export async function registrarAvance() {
    titulo('Register weekly progress');
    const sel = await elegirClienteYContrato({ soloActivos: true });
    if (!sel) return;

    const r = await inquirer.prompt([
        preguntaModelo(SeguimientoFisico, 'fecha', 'Date (YYYY-MM-DD):', { default: hoy() }),
        preguntaModelo(SeguimientoFisico, 'peso_kg', 'Weight (kg):'),
        opcional('grasa_corporal', 'Body fat (%)'),
        opcional('cintura_cm', 'Waist (cm)'),
        opcional('pecho_cm', 'Chest (cm)'),
        opcional('cadera_cm', 'Hips (cm)'),
        opcional('brazo_cm', 'Arm (cm)'),
        opcional('muslo_cm', 'Thigh (cm)'),
        opcional('puntuaje', 'Score 1-10'),
        opcional('comentarios', 'Comments'),
        { type: 'input', name: 'fotos', message: 'Photo URLs separated by commas (optional):',
          validate: (v) => v.trim() === '' || v.split(',').every((u) => validador('url', { tipo: 'url' })(u.trim()) === true) || 'Each photo must be a valid http(s) URL.' }
    ]);
    const { fotos, ...datos } = r;
    const urls = fotos.split(',').map((u) => u.trim()).filter(Boolean);
    const id = await servicioSeguimiento.registrarAvance({ ...datos, contrato_id: sel.contratoId }, urls);
    exito(`Progress record #${id} saved with ${urls.length} photo(s).`);
}

export async function verProgreso() {
    titulo('View progress');
    const sel = await elegirClienteYContrato({ soloActivos: false });
    if (!sel) return;
    const { registros, resumen } = await servicioSeguimiento.verProgreso(sel.contratoId);
    tabla(registros.map((s) => ({
        ID: s.id, Date: s.fecha, 'Weight kg': s.peso_kg, 'Fat %': s.grasa_corporal, Waist: s.cintura_cm,
        Chest: s.pecho_cm, Hips: s.cadera_cm, Arm: s.brazo_cm, Thigh: s.muslo_cm,
        Score: s.puntuaje, Photos: s.fotos, Comments: s.comentarios
    })), 'No progress records for this contract yet.');

    if (resumen) {
        const signo = (n) => (n > 0 ? chalk.red(`+${n}`) : chalk.green(String(n)));
        info(`\nChange ${resumen.desde} -> ${resumen.hasta}:  weight ${signo(resumen.cambioPesoKg)} kg` +
            (resumen.cambioGrasa !== null ? `,  body fat ${signo(resumen.cambioGrasa)} %` : ''));
    }
}

export async function eliminarRegistro() {
    titulo('Delete progress record');
    const sel = await elegirClienteYContrato({ soloActivos: false });
    if (!sel) return;
    const { registros } = await servicioSeguimiento.verProgreso(sel.contratoId);
    if (registros.length === 0) return aviso('No progress records to delete.');
    const { id } = await inquirer.prompt([{
        type: 'select', name: 'id', message: 'Select the record to delete:',
        choices: registros.map((s) => ({ name: `#${s.id}  ${s.fecha}  ${s.peso_kg} kg`, value: s.id }))
    }]);
    if (!(await confirmar('Delete this record?'))) return;
    await servicioSeguimiento.eliminarRegistro(id);
    exito('Record deleted.');
}
