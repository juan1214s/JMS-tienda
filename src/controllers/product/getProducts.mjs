import { connectToDatabase } from "../../DB/db.mjs";
import { getProductsQuery } from "../../DB/queries.mjs";

export const getProducts = async (req, res) => {
    let connection;
    try {
        connection = await connectToDatabase();
        const [getProducts] = await connection.execute(getProductsQuery);
        connection.end();

        // Agrupar los productos por id
        const productsMap = getProducts.reduce((acc, product) => {
            const { id, name, price, description, model, stock, brand_name, category_name, file_path } = product;

            //sino existe el id crea un objeto
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

            //indica q en cada iteracion devuelve el objeto
        }, {});

        // Convertir el objeto de productos agrupados en un array
        const transformedProducts = Object.values(productsMap);

        res.status(200).json(transformedProducts);
    } catch (error) {
        console.log(`Error al obtener los productos: ${error}`);
        res.status(500).json({ message: "Error interno al obtener los productos." });
    }
};
