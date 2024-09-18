import { connectToDatabase } from "../../DB/db.mjs";
import {  getUserByIdQuery } from "../../DB/queries.mjs";

export const getUserById = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;

        const idUser = Number(id);

        if (isNaN(idUser)) {
            return res.status(404).json({ error: 'ID ingresado no es valido.' });
        }

        connection = await connectToDatabase();

        const [userExists] = await connection.execute(getUserByIdQuery, [idUser]);

        if (userExists.length === 0) {
            return res.status(404).json({ error: 'El usuario no existe.' });
        }

        res.status(200).json(userExists);
    } catch (error) {
        console.log(`Error interno al intentar obtener el usuario por el id: ${error}`);
        res.status(500).json({ error: 'Error interno al intentar obtener el usuario.' });
    }
    finally {
        if (connection) {
            connection.end();
        }
    }
}