import { writeFile} from 'node:fs/promises';
import { ServicioClientes } from '../services/service_clientes.js';

export async function respaldarClientes(servicioClientes, ruta = './respaldo-clientes.json') {
    const cliente = await ServicioClientes.respaldar(id);
    await writeFile(ruta, JSON.stringify(cliente, null, 2), 'utf-8');
    return { ruta, total: cliente.JSON };
    // crear json file con datos del cliente individual y guardarlo en la ruta especificada

}

