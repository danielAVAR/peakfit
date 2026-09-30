import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
// nota: esto permitira que puedas hacer multiples consultas sin tener que cerrar sql una y otra vez. es decir siempre esta disponible para sus ejecuciones y querys 
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true,      
    decimalNumbers: true    
});

export default db;
