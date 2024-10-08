import { connectToDatabase } from "../../DB/db.mjs";
import { deleteUserQuery, validateUserExistsQuery } from "../../DB/queries.mjs";

export const deleteUser = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;

        const idUser = Number(id);

        if (isNaN(idUser)) {
            return res.status(404).json({ error: 'ID ingresado no es valido.' });
        }

        connection = await connectToDatabase();

        const [userExists] = await connection.execute(validateUserExistsQuery, [idUser]);

        if (userExists.length === 0) {
            return res.status(404).json({ error: 'El usuario no existe.' });
        }

        await connection.execute(deleteUserQuery, [idUser]);

        res.status(200).json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
        console.log(`Error interno al intentar eliminar un usuario: ${error}`);
        res.status(500).json({ error: 'Error interno al intentar eliminar un usuario.' });
    }
    finally {
        if (connection) {
            connection.end();
        }
    }
}