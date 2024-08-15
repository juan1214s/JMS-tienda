import { connectToDatabase } from "../../DB/db.mjs";
import { filterBrandQuery } from "../../DB/queries.mjs";

export const filterBrand = async (req, res) => {
    let connection;
    try {
        const { name } = req.body;

        // Verifica si el nombre de la marca es válida
        if (!name) {
            return res.status(400).json({ error: 'Debes ingresar la marca que deseas buscar.' });
        }

        connection = await connectToDatabase();

        // Consulta para obtener productos por nombre de marca
        const [brand] = await connection.execute(
           filterBrandQuery, 
            [name]
        );

        // Verifica si se encontraron resultados
        if (brand.length === 0) {
            return res.status(404).json({ error: 'No se encontraron productos para la marca especificada.' });
        }

        const brandMap = brand.reduce((acc, brand)=>{
            const {category_id, category_name, product_id, name, description, price, model, brand_id, brand_name, image_id, file_path} = brand;

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

        const transFormeBrand = Object.values(brandMap);

        res.status(200).json(transFormeBrand);
    } catch (error) {
        console.log(`Error al intentar filtrar por marca: ${error}`);
        res.status(500).json({ error: 'Error interno al filtrar por marca.' });
    } finally {
        if (connection) {
            connection.end();
        }
    }
}
