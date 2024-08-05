import { connectToDatabase } from "../../DB/db.mjs";
import { getCategoryQuery } from "../../DB/queries.mjs"

export const getCategory = async (req, res) =>{
  let connection;
    try {
        connection = await connectToDatabase()

        const [category] = await connection.execute(getCategoryQuery);
        connection.end();

        res.status(200).json(category)
    } catch (error) {
        console.log(`Error al obtener las categorias: ${error}`);
        res.status(500).json({error: `Error interno al obtener las categorias`})
    }
}