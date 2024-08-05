import { connectToDatabase } from "../../DB/db.mjs"
import { getProductIdQuery } from "../../DB/queries.mjs"

export const getProductId = async (req, res)=>{
    let connection;
    try {
        const { id } = req.params;

        //convierte el id q recibe por parametros en un numero
        const productId = Number(id)

        //verifica q si sea un numero
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'ID de producto inválido' });
          }

        //establece la conexion de la base de datos
        connection = await connectToDatabase();

        //verifica si el id del producto existe en la base de datos
        const [getProductId] = await connection.execute(getProductIdQuery, [productId]);

        
        if (getProductId.length === 0) {
            return res.status(404).json({message: "No se encontro el producto."})
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
                    file_paths:[]
                }
            }

            // Añadir el file_path al array de file_paths
            acc[id].file_paths.push(file_path);

            return acc;

            //indica q en cada iteracion devuelve el objeto
        },{}) 

         // Convertir el objeto de productos agrupados en un array
        const transformedProducts = Object.values(productsMap);
        
        // Convertir el objeto de productos agrupados en un array
        res.status(200).json(transformedProducts);
    } catch (error) {
        console.log(`Error al obtener los productos ${error}`);
        res.status(500).json({message: 'Error interno al obtener los productos'});
    }
}