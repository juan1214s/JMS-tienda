import { connectToDatabase } from "../../DB/db.mjs";
import bcrypt from "bcrypt"; // Asegúrate de instalar bcrypt
import dotenv from "dotenv";
import { createUserQuery, validateEmailExistsQuery } from "../../DB/queries.mjs";

dotenv.config();

export const createUser = async (req, res) => {
    let connection;
    try {
        // Desestructurar los datos enviados en el cuerpo de la petición
        const { username, phone, adress, password, email } = req.body;

        // Verificar que todos los campos estén presentes
        if (!username || !phone || !adress || !password || !email) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Conectar a la base de datos
        connection = await connectToDatabase();

        // Verificar si el usuario ya existe
        const [existingUser] = await connection.execute(validateEmailExistsQuery, [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ error: "Ya existe un usuario con ese correo electronico." });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 5); 

        await connection.execute(createUserQuery, [username, phone, adress, hashedPassword, email]);

        // Responder con éxito
        res.status(201).json({ message: "Usuario creado exitosamente." });
    } catch (error) {
        console.error(`Error al crear el usuario: ${error}`);
        res.status(500).json({ error: "Error interno del servidor." });
    } finally {
        // Asegúrate de cerrar la conexión
        if (connection) {
            await connection.end();
        }
    }
};
