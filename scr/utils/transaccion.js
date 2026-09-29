
import db from '../config/database.js';

export async function conTransaccion(trabajo) {
    const conexion = await db.getConnection();   
    try {
        await conexion.beginTransaction();        
        const resultado = await trabajo(conexion);
        await conexion.commit();                 
        return resultado;
    } catch (error) {
        await conexion.rollback();               
        throw error;                             
    } finally {
        conexion.release();                    
    }
}
