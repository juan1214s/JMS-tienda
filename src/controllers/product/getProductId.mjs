import { connectToDatabase } from "../../DB/db.mjs"
import { validateProductExistsQuery, getProductIdQuery } from "../../DB/queries.mjs"

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
        const [productExists] = await connection.execute(validateProductExistsQuery, [productId]);

        if (productExists.length === 0) {
            return res.status(404).json({message: "No se encontro el producto."})
        }

        //consulta para obtener un producto mediante el id 
        const [getProductId] = await connection.execute(getProductIdQuery, [productId])
        connection.end();
        
        res.status(200).json(getProductId);
    } catch (error) {
        console.log(`Error al obtener los productos ${error}`);
        res.status(500).json({message: 'Error interno al obtener los productos'});
    }
}