import { connectToDatabase } from "../../DB/db.mjs";
import { filterCategoryQuery } from "../../DB/queries.mjs";

export const filterCategory = async (req, res) => {
    let connection;
    try {
        const { name } = req.body;

        // Verifica si el nombre de la categoría es válido
        if (!name) {
            return res.status(400).json({ error: 'Debes ingresar la categoría que deseas buscar.' });
        }

        connection = await connectToDatabase();

        // Consulta para obtener productos por nombre de categoría
        const [category] = await connection.execute(
           filterCategoryQuery, 
            [name]
        );

        // Verifica si se encontraron resultados
        if (category.length === 0) {
            return res.status(404).json({ error: 'No se encontraron productos para la categoría especificada.' });
        }

        const categoryMap = category.reduce((acc, category)=>{
            const {category_id, category_name, product_id, name, description, price, model, brand_id, brand_name, image_id, file_path} = category;

            if (!acc[product_id]) {
                acc[product_id]={
                    category_id, 
                    category_name, 
                    product_id, 
                    name, 
                    description, 
                    price, 
                    model, 
                    brand_id, 
                    brand_name, 
                    image_id, 
                    file_paths:[]
                }
            }
            acc[product_id].file_paths.push(file_path)

            return acc;
        },{})

        const transFormeCategory = Object.values(categoryMap);


        res.status(200).json(transFormeCategory);
    } catch (error) {
        console.log(`Error al intentar filtrar por categorías: ${error}`);
        res.status(500).json({ error: 'Error interno al filtrar por categorías.' });
    } finally {
        if (connection) {
            connection.end();
        }
    }
}
