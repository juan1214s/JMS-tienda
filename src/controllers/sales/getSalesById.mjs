import { connectToDatabase } from "../../DB/db.mjs";
import { getSalesByIdQuery } from "../../DB/queries.mjs";

export const getSalesByid = async (req, res)=>{

    let connection;
    try {
        const { id } = req.params;

        const idUser = Number(id);
        if (isNaN(idUser)) {
            return res.status(400).json({ error: 'ID de usuario invalido.' });
          }

        connection = await connectToDatabase();

        const [getSales] =  await connection.execute(getSalesByIdQuery, [idUser]);

        if (getSales.length == 0) {
            return res.status(400).json({error: 'No hay productos vendidos.'});
        }

        res.status(200).json(getSales);
    } catch (error) {
        console.log(`Error interno al obtener la informacion de la tabla ventas: ${error}`);
        res.status(500).json({message: 'Error interno al obtener la informacion de la tabla ventas'});
    }
    finally{
        if (connection) {
            connection.end();
        }
    }

}
