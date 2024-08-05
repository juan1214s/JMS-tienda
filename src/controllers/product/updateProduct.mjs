import { connectToDatabase } from "../../DB/db.mjs";
import { getProductIdQuery, updateProductQuery, getsAssociatedImagesQuery, deleImagesQuery, insertImageQuery } from "../../DB/queries.mjs";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Obtener la ruta del directorio actual usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const updateProduct = async (req, res) => {
    let connection;
    try {
        connection = await connectToDatabase();

        const { name, description, price, model, stock, brand_id, category_id } = req.body;
        const { id } = req.params;
        const files = req.files && req.files['images'] ? req.files['images'] : [];

        let productId = Number(id);

        // Verificar si algún campo está vacío
        if (!name || !description || !price || !model || !stock || !brand_id || !category_id) {
            return res.status(400).json({ message: 'Todos los campos son requeridos.' });
        }

        const [productExists] = await connection.execute(getProductIdQuery, [productId]);

        if (productExists.length === 0) {
            return res.status(404).json({ message: 'El producto que intentas actualizar no existe.' });
        }

        await connection.execute(updateProductQuery, [name, description, price, model, stock, brand_id, category_id, productId]);

        if (files.length > 0) {
            // Obtener las rutas de las imágenes asociadas
            const [rows] = await connection.execute(getsAssociatedImagesQuery, [productId]);

            // Eliminar imágenes anteriores
            rows.forEach(row => {
                const filePath = path.resolve(__dirname, '../../../', row.file_path);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                } else {
                    console.warn(`Archivo no encontrado: ${filePath}`);
                }
            });

            // Eliminar imágenes de la base de datos
            await connection.execute(deleImagesQuery, [productId]);

            // Insertar nuevas imágenes
            const imageInsertPromises = files.map(file =>
                connection.execute(
                    insertImageQuery,
                    [productId, file.path]
                )
            );

            //indica q sube todas las imagenes
            await Promise.all(imageInsertPromises);
        }

        res.status(200).json({ message: 'Se actualizó correctamente el producto.' });
    } catch (error) {
        console.error('Error interno:', error.message);
        res.status(500).json({ error: `Error interno: ${error.message}` });
    } finally {
        if (connection) {
            connection.end();
        }
    }
};
