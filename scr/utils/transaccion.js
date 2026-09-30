
import db from '../config/database.js';

export async function conTransaccion(trabajo) {
    const conexion = await db.getConnection();   
    try {
        await conexion.beginTransaction();        
        const resultado = await trabajo(conexion);
        await conexion.commit();                 
        return resultado;
    } catch (error) {
        // aqui se aplica la primera propiedad de ACID: atomicidad. profe este comentario no es IA esto lo hice yo creame :(
        await conexion.rollback();               
        throw error;                             
    } finally {
        conexion.release();                    
    }
}
