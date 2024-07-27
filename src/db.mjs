import mysql from 'mysql2/promise';
import dotenv from "dotenv"

dotenv.config();

// Configuración de la conexión
const connectionConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
};

// Crear una conexión
export async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    console.log('Conectado a la base de datos');
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}
