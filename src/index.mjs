import app from './app.mjs'; // Importar la aplicación desde app.mjs
import { connectToDatabase } from './db.mjs'; // Importar la función de conexión a la base de datos

const PORT = process.env.PORT || 3000 || 5000 || 3400;

async function startServer() {
  try {
    await connectToDatabase(); // Conectar a la base de datos
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

startServer();

