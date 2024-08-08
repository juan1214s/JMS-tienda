import { connectToDatabase } from '../../DB/db.mjs';
import { getBrandsQuery } from "../../DB/queries.mjs";

export const getBrands = async (req, res) => {
  let connection;
  try {
    connection = await connectToDatabase();

    const [brands] = await connection.execute(getBrandsQuery);

    res.status(200).json(brands);
  } catch (error) {
    console.error(`Error al obtener las marcas: ${error}`);
    res.status(500).json({ error: 'Error interno al obtener las marcas.' });
  } finally {
    // Cerrar la conexión a la base de datos
    if (connection) {
      await connection.end();
    }
  }
};
