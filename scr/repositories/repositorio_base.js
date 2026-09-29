// PATRON DE DISEÑO #2: REPOSITORY
// Un repositorio es la UNICA capa que conoce el SQL. Los servicios piden datos por su
// intencion ("buscarPorId") sin saber como estan guardados (principio DIP / SRP).
//
// Cada metodo recibe una `conexion` opcional: si viene de una transaccion, la usa;
// si no, usa el pool normal. Asi el mismo metodo sirve dentro y fuera de una transaccion.
import db from '../config/database.js';

export class RepositorioBase {
    async ejecutar(sql, parametros = [], conexion = db) {
        const seguros = parametros.map((p) => (p === undefined ? null : p));
        const [resultado] = await conexion.execute(sql, seguros);
        return resultado;
    }
}
