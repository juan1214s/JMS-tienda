import { connectToDatabase } from "../../DB/db.mjs";
import { getProductByIdQuery } from "../../DB/queries.mjs";

export const getProductId = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;

        // Convierte el id que recibe por parámetros en un número
        const productId = Number(id);

        // Verifica que sea un número
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'ID de producto inválido' });
        }

        // Establece la conexión de la base de datos
        connection = await connectToDatabase();

        // Verifica si el id del producto existe en la base de datos
        const [getProductId] = await connection.execute(getProductByIdQuery, [productId]);

        if (getProductId.length === 0) {
            return res.status(404).json({ message: "No se encontró el producto." });
        }

        // Agrupar los productos por id
        const productsMap = getProductId.reduce((acc, product) => {
            const { id, name, price, description, model, stock, brand_name, category_name, file_path } = product;

            if (!acc[id]) {
                acc[id] = {
                    id,
                    name,
                    price,
                    description,
                    model,
                    stock,
                    brand_name,
                    category_name,
                    file_paths: []
                };
            }

            // Añadir el file_path al array de file_paths
            acc[id].file_paths.push(file_path);

            return acc;
        }, {});

        // Convertir el objeto de productos agrupados en un array
        const transformedProducts = Object.values(productsMap);

        res.status(200).json(transformedProducts);
    } catch (error) {
        console.log(`Error al obtener los productos: ${error}`);
        res.status(500).json({ message: 'Error interno al obtener los productos' });
    } finally {
        // Cerrar la conexión a la base de datos
        if (connection) {
            await connection.end();
        }
    }
};
