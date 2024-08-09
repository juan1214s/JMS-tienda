import { connectToDatabase } from "../../DB/db.mjs";
import { createCart_itemQuery, createCartQuery, validateCartExistsQuery } from "../../DB/queries.mjs";

export const createCart = async (req, res) => {
    let connection;
    try {
        const { producId, quantity } = req.body;
        const { id } = req.params;

        // Verifica si los parámetros son válidos
        if (!producId || !quantity) {
            return res.status(400).json({ error: 'El ID del Producto y la cantidad son requeridos.' });
        }

        const userId = Number(id);

        if (isNaN(userId)) {
            return res.status(400).json({ error: 'ID de usuario inválido.' });
        }

        connection = await connectToDatabase();

        // Verifica si el usuario ya tiene un carrito
        const [cart] = await connection.execute(validateCartExistsQuery, [userId]);

        let cartId;

        if (cart.length > 0) {
            //accede al indice 0 del array q devuelve la consulta cart
            cartId = cart[0].id;
        } else {
            // Crea un nuevo carrito si no existe
            const [result] = await connection.execute(createCartQuery, [userId]);
            cartId = result.insertId;
        }

        // Inserta el artículo en el carrito
        await connection.execute(createCart_itemQuery, [cartId, producId, quantity]);

        res.status(200).json({ message: 'Se insertó correctamente el item.' });
    } catch (error) {
        console.log(`Error al insertar la información en el carrito: ${error}`);
        res.status(500).json({ error: 'Error interno al insertar la información en el carrito.' });
    }
}
