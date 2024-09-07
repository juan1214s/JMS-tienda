import { connectToDatabase } from "../../DB/db.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res) => {
    let connection;
    try {
        connection = await connectToDatabase();

        const { email, password } = req.body;

        // Consulta al usuario con el email
        const [userExists] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);

        // Verificar si existe el usuario
        if (userExists.length === 0) {
            return res.status(404).json({ error: 'Correo o contraseña incorrectos.' });
        }

        // Acceder a los datos del usuario
        const user = userExists[0];

        // Verificar la contraseña hasheada
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(404).json({ error: 'Correo o contraseña incorrectos.' });
        }

        // Crear payload para el JWT
        const payload = {
            sub: user.id,
            usuario: user.email,
            nombre: user.username
        };

        // Obtener el secreto del JWT desde las variables de entorno
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

        // Respuesta con el token y el ID del usuario
        res.json({ message: 'Acceso concedido', accessToken, idUsuario: user.id });
    } catch (error) {
        console.error(`Error interno al generar el token del login: ${error}`);
        res.status(500).json({ error: 'Error interno al generar el token del login.' });
    } finally {
        if (connection) {
            await connection.end(); // Cerrar la conexión si fue abierta
        }
    }
};
