// CONTENEDOR DE DEPENDENCIAS (composition root)
// Es el UNICO lugar donde se "arman" las piezas: repositorios -> servicios.
// Los servicios no crean sus repositorios: los reciben (Inversion de Dependencias, la "D" de SOLID).
import { ClienteRepositorio } from './repositories/cliente_repo.js';
import { PlanEntrenamientoRepositorio } from './repositories/plan_entrenamiento_repo.js';
import { ContratoRepositorio } from './repositories/contrato_repo.js';
import { SeguimientoRepositorio } from './repositories/seguimiento_repo.js';
import { NutricionRepositorio } from './repositories/nutricion_repo.js';
import { FinanzasRepositorio } from './repositories/finanzas_repo.js';

import { ServicioClientes } from './services/service_clientes.js';
import { ServicioPlanes } from './services/service_planes.js';
import { ServicioSeguimiento } from './services/service_seguimiento_fisico.js';
import { ServicioNutricion } from './services/service_nutricion.js';
import { ServicioFinanzas } from './services/service_finanzas.js';

const repoClientes = new ClienteRepositorio();
const repoPlanes = new PlanEntrenamientoRepositorio();
const repoContratos = new ContratoRepositorio();
const repoSeguimiento = new SeguimientoRepositorio();
const repoNutricion = new NutricionRepositorio();
const repoFinanzas = new FinanzasRepositorio();

export const servicioClientes = new ServicioClientes(repoClientes);
export const servicioPlanes = new ServicioPlanes({ repoPlanes, repoContratos, repoClientes, repoFinanzas, repoSeguimiento });
export const servicioSeguimiento = new ServicioSeguimiento({ repoSeguimiento, repoContratos });
export const servicioNutricion = new ServicioNutricion({ repoNutricion, repoContratos });
export const servicioFinanzas = new ServicioFinanzas({ repoFinanzas, repoClientes });
