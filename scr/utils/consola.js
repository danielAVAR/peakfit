// Utilidades de presentacion en consola (chalk = colores)
import chalk from 'chalk';

export const titulo  = (t) => console.log('\n' + chalk.bold.cyan(`== ${t} ==`));
export const exito   = (t) => console.log(chalk.green(`✔ ${t}`));
export const aviso   = (t) => console.log(chalk.yellow(`! ${t}`));
export const error   = (t) => console.log(chalk.red(`✖ ${t}`));
export const info    = (t) => console.log(chalk.gray(t));
export const dinero  = (n) => `$${Number(n).toFixed(2)}`;

export function tabla(filas, vacio = 'No hay registros.') {
    if (!filas || filas.length === 0) return aviso(vacio);
    console.table(filas);
}
