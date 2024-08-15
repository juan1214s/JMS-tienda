import { connectToDatabase } from "../../DB/db.mjs";
import { getCartQuery } from "../../DB/queries.mjs"; 

export const getCart = async (req, res) => { // Exporta la función getCart para manejar la solicitud de obtener el carrito
    let connection;
    try {
        const { id } = req.params; // Obtiene el ID del usuario desde los parámetros de la solicitud

        const userId = Number(id); // Convierte el ID del usuario a un número

        if (!userId) {  // Verifica si el ID del usuario no es válido
            return res.status(400).json({ error: 'ID de usuario no válido.' }); // Responde con un error 400 si el ID no es válido
        }

        connection = await connectToDatabase(); // Conecta a la base de datos

        const [result] = await connection.execute(getCartQuery, [userId]); // Ejecuta la consulta SQL para obtener el carrito de compras del usuario

        // Reduce los resultados para agrupar la información del carrito
        const mapResult = result.reduce((acc, cart) => {
            // Desestructura los campos necesarios de cada fila del resultado
            const { cartItem_id, cart_id, user_id, created_at, cart_item_id, quantity, product_id, name, description, price, model, brand_name, image_id, file_path, brand_id } = cart;

            // Verifica si el carrito no ha sido añadido al acumulador
            if (!acc[product_id]) {
                acc[product_id] = {
                    cartItem_id,
                    cart_id, // ID del carrito
                    user_id, // ID del usuario
                    created_at, // Fecha de creación del carrito
                    cart_item_id, // ID del ítem del carrito
                    quantity, // Cantidad del ítem
                    product_id, // ID del producto
                    name, // Nombre del producto
                    description, // Descripción del producto
                    price, // Precio del producto
                    model, // Modelo del producto
                    brand_id, //id de la marca
                    brand_name, // Nombre de la marca del producto
                    image_id, // ID de la imagen del producto
                    file_paths: [] // Inicializa un array vacío para almacenar las rutas de las imágenes del producto
                }
            }
            acc[product_id].file_paths.push(file_path); // Añade la ruta de la imagen al array file_paths

            return acc; // Retorna el acumulador para la siguiente iteración
        }, {});

        // Convierte el acumulador a un array para la respuesta
        const transformeCart = Object.values(mapResult);

        res.status(200).json(transformeCart); // Responde con un código de estado 200 y el carrito transformado en formato JSON
    } catch (error) {
        // Maneja cualquier error que ocurra durante el proceso
        console.log(`Error al obtener la información del carrito de compras: ${error}`);
        res.status(500).json({ error: 'Error interno al intentar obtener la información del carrito de compras.' }); // Responde con un error 500 en caso de fallos internos
    } finally {
        if (connection) {
            connection.end(); // Cierra la conexión a la base de datos
        }
    }
}
