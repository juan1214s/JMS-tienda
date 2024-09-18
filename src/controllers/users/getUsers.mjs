import { connectToDatabase } from "../../DB/db.mjs";
import { getUsersQuery } from "../../DB/queries.mjs";

export const getUsers = async (req, res) => {
    let connection;
    try {
        
        connection = await connectToDatabase();

        const [getUsers] = await connection.execute(getUsersQuery);

        if (getUsers.length === 0) {
            return res.status(404).json({ error: 'No hay usuarios registrados.' });
        }

        res.status(200).json(getUsers);
    } catch (error) {
        console.log(`Error interno al intentar obtener los usuarios: ${error}`);
        res.status(500).json({ error: 'Error interno al intentar obtener los usuarios.' });
    }
    finally {
        if (connection) {
            connection.end();
        }
    }
}