import { connectToDatabase } from "../../DB/db.mjs";
import { updateQuantityCartItemQuery, validateCartExistsQuery } from "../../DB/queries.mjs";

export const updateQuantity = async (req, res) => {
    let connection;
    try {
        // Extrae la cantidad del cuerpo de la solicitud y el ID del parámetro de la URL
        const { quantity } = req.body;
        const { id } = req.params;

        // Convierte los valores a números para asegurar que se pueden comparar y trabajar con ellos
        const idCart = Number(id);
        const quantityCart = Number(quantity);
        
        // Verifica si la cantidad o el ID no son números válidos
        if (isNaN(quantityCart) || isNaN(idCart)) {
            return res.status(400).json({ error: 'El ID o la cantidad son inválidos.' });
        }

        // Conecta a la base de datos
        connection = await connectToDatabase();

        // Verifica si el producto existe en el carrito utilizando una consulta SQL
        const [productCartExists] = await connection.execute(validateCartExistsQuery, [idCart]);

        // Si no se encuentra ningún producto en el carrito con ese ID, retorna un error
        if (productCartExists === 0) {
            return res.status(400).json({ error: 'No se encontró ningún producto en el carrito con ese ID.' });
        }

        // Si el producto existe, actualiza la cantidad en la base de datos
        await connection.execute(updateQuantityCartItemQuery, [quantityCart, idCart]);

        // Responde con un mensaje de éxito si la cantidad se actualizó correctamente
        res.status(200).json({ message: 'Se actualizó correctamente la cantidad del producto en el carrito.' });
    } catch (error) {
        // Manejo de errores, loguea el error y responde con un mensaje de error
        console.log(`Error al intentar actualizar la cantidad de un producto en el carrito: ${error}`);
        res.status(500).json({ error: 'Error interno al intentar actualizar la cantidad de un producto en el carrito.' });
    } finally {
        // Asegúrate de cerrar la conexión a la base de datos, incluso si ocurre un error
        if (connection) {
            connection.end();
        }
    }
};
