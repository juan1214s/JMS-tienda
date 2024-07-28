import { connectToDatabase } from '../../DB/db.mjs';
import { insertBrandQuery } from "../../DB/queries.mjs"

export const getBrands = async (req, res) => {
  try {
    const connection = await connectToDatabase();

    const [brands] = await connection.execute(insertBrandQuery);
    connection.end();

    res.status(200).json(brands);
  } catch (error) {
    console.error('Error al obtener las marcas:', error);
    res.status(500).json({ error: 'Error al obtener las marcas' });
  }
};
