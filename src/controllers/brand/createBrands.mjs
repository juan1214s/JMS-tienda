import { connectToDatabase } from "../../DB/db.mjs";
import { createBrandQuery, validateBrandExistsQuery } from "../../DB/queries.mjs";

export const createBrand = async (req, res) => {
    let connection;
    try {
        connection = await connectToDatabase();

        const { name } = req.body;

        // Verifica si la marca ya existe
        const [brandExists] = await connection.execute(validateBrandExistsQuery, [name]);

        if (brandExists.length > 0) {
            return res.status(400).json({ error: 'La marca ya existe.' });
        }

        // Inserta la nueva marca
        await connection.execute(createBrandQuery, [name]);

        res.status(201).json({ message: 'Marca creada exitosamente.' });
    } catch (error) {
        console.error(`Error al crear la marca: ${error}`);
        res.status(500).json({ error: 'Error interno al crear la marca' });
    } finally {
        // Cerrar la conexión a la base de datos
        if (connection) {
            await connection.end();
        }
    }
};
