import { connectToDatabase } from "../../DB/db.mjs";
import bcrypt from "bcrypt"; 
import dotenv from "dotenv";
import { updateUserQuery, getUserByIdQuery, validateEmailExistsQuery } from "../../DB/queries.mjs";

dotenv.config();

export const updateUser = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        const { username, phone, adress, password, email } = req.body;

        // Conectar a la base de datos
        connection = await connectToDatabase();

        // Verificar si el usuario existe
        const [existingUser] = await connection.execute(getUserByIdQuery, [id]);
        if (existingUser.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }

        // Si se proporciona un correo electrónico, verifica si ya existe en otro usuario
        if (email && email !== existingUser[0].email) {
            const [emailUser] = await connection.execute(validateEmailExistsQuery, [email]);
            if (emailUser.length > 0) {
                return res.status(409).json({ error: "Ya existe un usuario con ese correo electrónico." });
            }
        }

        // Verificar si se necesita hashear la contraseña
        let hashedPassword = existingUser[0].password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 5);
        }

        // Actualizar el usuario con los nuevos datos o conservar los existentes
        await connection.execute(updateUserQuery, [
            username || existingUser[0].username,
            phone || existingUser[0].phone,
            adress || existingUser[0].adress,
            hashedPassword,
            email || existingUser[0].email,
            id
        ]);

        // Responder con éxito
        res.status(200).json({ message: "Usuario actualizado exitosamente." });
    } catch (error) {
        console.error(`Error al actualizar el usuario: ${error}`);
        res.status(500).json({ error: "Error interno del servidor." });
    } finally {
        // Asegúrate de cerrar la conexión
        if (connection) {
            await connection.end();
        }
    }
};
