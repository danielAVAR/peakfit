
import db from '../config/database.js';

export class RepositorioBase {
    async ejecutar(sql, parametros = [], conexion = db) {
        const seguros = parametros.map((p) => (p === undefined ? null : p));
        const [resultado] = await conexion.execute(sql, seguros);
        return resultado;
    }
}
