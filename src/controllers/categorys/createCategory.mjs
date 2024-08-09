import { connectToDatabase } from "../../DB/db.mjs";
import { createCategoryQuery, validateCategoryExistsQuery } from "../../DB/queries.mjs";

// Función para crear una nueva categoría
export const createCategory = async (req, res) => {
    let connection;
    try {
        // Establecer conexión a la base de datos
        connection = await connectToDatabase();

        // Obtener el nombre de la categoría del cuerpo de la solicitud
        const { name } = req.body;

        // Verificar si la categoría ya existe en la base de datos
        const [categoryExists] = await connection.execute(validateCategoryExistsQuery, [name]);

        // Si la categoría ya existe, devolver un error
        if (categoryExists.length > 0) {
            return res.status(400).json({ error: 'La categoría ya existe.' });
        }

        // Insertar la nueva categoría en la base de datos
        await connection.execute(createCategoryQuery, [name]);

        // Devolver una respuesta exitosa
        res.status(200).json({ message: 'Categoría creada exitosamente.' });
    } catch (error) {
        // Manejar errores y devolver una respuesta de error
        console.log(`Error al intentar eliminar la categoria: ${error}`);
        res.status(500).json({ error: 'Error interno al crear la categoría.' });
    } finally {
        // Cerrar la conexión a la base de datos en el bloque finally para asegurar que siempre se libere la conexión
        if (connection) {
            await connection.end();
        }
    }
};
