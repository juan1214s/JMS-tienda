import { connectToDatabase } from "../../DB/db.mjs";
import { deleteBrandQuery, validateBrandExistsByIdQuery } from "../../DB/queries.mjs";

export const deleteBrand = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;

        // Convertir el id que recibe por parámetros en un número
        const brandId = Number(id);

        // Verificar que sea un número
        if (isNaN(brandId)) {
            return res.status(400).json({ error: 'ID de marca inválido' });
        }

        // Establecer la conexión a la base de datos
        connection = await connectToDatabase();

        // Verificar si la marca existe
        const [brandExists] = await connection.execute(validateBrandExistsByIdQuery, [brandId]);

        if (brandExists.length === 0) {
            return res.status(404).json({ error: 'La marca no existe.' });
        }

        // Eliminar la marca
        await connection.execute(deleteBrandQuery, [brandId]);

        res.status(200).json({ message: 'Marca eliminada exitosamente.' });
    } catch (error) {
        console.error(`Error al eliminar la marca: ${error}`);
        res.status(500).json({ error: 'Error interno al eliminar la marca.' });
    } finally {
        // Cerrar la conexión a la base de datos
        if (connection) {
            await connection.end();
        }
    }
};
