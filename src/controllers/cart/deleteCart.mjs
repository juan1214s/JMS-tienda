import {connectToDatabase} from '../../DB/db.mjs';
import { deleteCartItemQuery, validateCartExistsQuery } from '../../DB/queries.mjs';

export const deleteCart = async (req, res) =>{
    let connetion;
    try {
        const { id } = req.params;

        const cartId = Number(id);
        
        if (isNaN(cartId)) {  // Verifica si el ID del usuario no es válido
            return res.status(400).json({ error: 'ID del carrito no válido.' }); // Responde con un error 400 si el ID no es válido
        }

        connetion = await connectToDatabase();

        const [carItemExists] = await connetion.execute(validateCartExistsQuery, [cartId]);

        if (carItemExists.length === 0) {
            return res.status(404).json({error: 'El producto del carrito que intentas eliminar no existe.'});
        }

        await connetion.execute(deleteCartItemQuery, [cartId]);

        res.status(200).json({message: 'Se elimino exitosamente el producto del carrito.'});
    } catch (error) {
        console.log(`Error al intentar eliminar el producto del carrito:  ${error}`);
        res.status(500).json({error: 'Error interno al intentar el producto del carrito.'})
    }finally{
        if (connetion) {
            connetion.end();
        }
    }
}