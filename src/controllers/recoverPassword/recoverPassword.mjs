import { connectToDatabase } from "../../DB/db.mjs";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { recoverPasswordQuery } from "../../DB/queries.mjs";

dotenv.config();

export const recoverPassword = async (req, res) => {
    let connection;
    try {
        const { email, phone, password } = req.body;

        if (!email || !phone || !password) {
            return res.status(400).json({ error: 'El correo, teléfono y nueva contraseña son requeridos.' });
        }

        connection = await connectToDatabase();

        const [emailAndPhoneExist] = await connection.execute(recoverPasswordQuery, [email, phone]);

        if (emailAndPhoneExist.length === 0) {
            return res.status(400).json({ error: 'No coinciden el correo o el teléfono con los registrados.' });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const hashedPassword = await bcrypt.hash(password, 5);

        await connection.execute("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email]);

        // Definir el correo electrónico a enviar
        const mailOptions = {
            from: "", // El correo que usas para enviar
            to: emailAndPhoneExist[0].email, // Correo del usuario que está solicitando la recuperación
            subject: 'Confirmación del cambio de contraseña de la tienda JMS',
            html: `
                <html>
                <head>
                    <style>
                        .container {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            max-width: 600px;
                            margin: auto;
                        }
                        .header {
                            background-color: #f4f4f4;
                            padding: 10px;
                            text-align: center;
                        }
                        .content {
                            margin: 20px 0;
                        }
                        .footer {
                            font-size: 12px;
                            color: #888;
                            text-align: center;
                            margin-top: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Tienda JMS</h1>
                        </div>
                        <div class="content">
                            <p>Hola,</p>
                            <p>Tu contraseña ha sido cambiada exitosamente.</p>
                            <p>Tu nueva contraseña es: <strong>${password}</strong></p>
                            <p>Si no has solicitado este cambio, por favor contacta a nuestro soporte inmediatamente.</p>
                            <p>Gracias por usar nuestros servicios.</p>
                        </div>
                        <div class="footer">
                            <p>&copy; ${new Date().getFullYear()} Tienda JMS. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        };

        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Contraseña actualizada exitosamente. Revisa tu correo electrónico.' });
    } catch (error) {
        console.error(`Error interno al intentar cambiar la contraseña del usuario: ${error.message}`);
        res.status(500).json({ error: 'Error interno al intentar cambiar la contraseña del usuario.' });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};
