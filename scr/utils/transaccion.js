// ============================================================================
//  TRANSACCIONES  (la pieza que garantiza la CONSISTENCIA de los datos)
// ============================================================================
// Una transaccion agrupa varias operaciones SQL en un bloque "todo o nada":
//   - Si TODAS salen bien  -> COMMIT   (se guardan juntas)
//   - Si UNA falla         -> ROLLBACK (no se guarda ninguna)
//
// Uso:
//   await conTransaccion(async (conexion) => {
//       await repoA.crear(datos, conexion);
//       await repoB.crear(datos, conexion);   // si esto falla, lo de repoA se deshace
//   });
//
// Todos los repositorios aceptan esa "conexion" para participar en la MISMA transaccion.
import db from '../config/database.js';

export async function conTransaccion(trabajo) {
    const conexion = await db.getConnection();   // una conexion dedicada (la transaccion vive en ella)
    try {
        await conexion.beginTransaction();       // BEGIN
        const resultado = await trabajo(conexion);
        await conexion.commit();                 // COMMIT
        return resultado;
    } catch (error) {
        await conexion.rollback();               // ROLLBACK: se deshace TODO lo hecho en el bloque
        throw error;                             // se relanza para que la capa superior muestre el error
    } finally {
        conexion.release();                      // devolver la conexion al pool
    }
}
