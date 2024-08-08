import { connectToDatabase } from '../../DB/db.mjs';
import { updateBrandQuery, validateBrandExistsByIdQuery } from '../../DB/queries.mjs';

export const updateBrand = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const categoryId = Number(id);

    if (isNaN(categoryId)) {
        return res.status(400).json({ error: 'ID de Marca inválido' });
    }

    let connection;
    try {
        connection = await connectToDatabase();

        // Verificar si la marca existe
        const [brand] = await connection.execute(validateBrandExistsByIdQuery, [categoryId]);
        console.log(brand)

        if (brand.length === 0) {
            return res.status(404).json({ error: 'Marda no encontrada' });
        }

        // Actualizar la marca
        await connection.execute(updateBrandQuery, [name, categoryId]);

        res.status(200).json({ message: 'Marca actualizada exitosamente' });
    } catch (error) {
        console.error(`Error al actualizar la Marca: ${error}`);
        res.status(500).json({ error: 'Error interno al actualizar la marca.' });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};
