import { connectToDatabase } from "../../DB/db.mjs";
import { createCartItemQuery, createCartQuery, productExistsCartQuery, updateQuantityProductExistQuery, validateCartExistsQuery } from "../../DB/queries.mjs";

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
            // Accede al índice 0 del array que devuelve la consulta cart
            cartId = cart[0].id;
        } else {
            // Crea un nuevo carrito si no existe
            const [result] = await connection.execute(createCartQuery, [userId]);
            cartId = result.insertId;
        }

        // Verifica si el producto ya está en el carrito
        const [productExistsCart] = await connection.execute(
            productExistsCartQuery,
            [producId, cartId]
        );

        if (productExistsCart.length > 0) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            await connection.execute(
                updateQuantityProductExistQuery,
                [quantity, producId, cartId]
            );
        } else {
            // Inserta el artículo en el carrito si no existe
            await connection.execute(createCartItemQuery, [cartId, producId, quantity]);
        }

        res.status(200).json({ message: 'El artículo se insertó o actualizó correctamente en el carrito.' });
    } catch (error) {
        console.log(`Error al insertar o actualizar la información en el carrito: ${error}`);
        res.status(500).json({ error: 'Error interno al insertar o actualizar la información en el carrito.' });
    } finally {
        if (connection) {
            connection.end();
        }
    }
}
