import Stripe from 'stripe';
import { connectToDatabase } from "../../DB/db.mjs";

// Usa tu clave secreta real aquí
const stripe = new Stripe('sk_test_51OvpUi2LHwPQKUjhMEjIA1lOIWwZsa5L64RuB86txCMuH8aH0TyFNUUom4p28lVg3TrG4tONyhSyB5dR2jOxkFFy00yOaQV2os', { apiVersion: '2022-11-15' });

export const createStripe = async (req, res) => {
    let connection;
    try {
        const { items } = req.body;
        const { id } = req.params;


        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'El carrito está vacío.' });
        }

        const idUser = Number(id);

        if (isNaN(idUser)) {
            return res.status(400).json({ error: 'ID de usuario no válido.' });
        }

        // Crear sesión de Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'cop',
                    product_data: {
                        name: item.name || 'Producto desconocido',
                    },
                    unit_amount: item.price ? item.price * 100 : 0, // El precio debe estar en centavos
                },
                quantity: item.quantity || 1,
            })),
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        connection = await connectToDatabase();
        await connection.beginTransaction();

        // Insertar la venta
        const [sales] = await connection.execute(
            'INSERT INTO sales (user_id, total, session_id) VALUES (?, ?, ?)',
            [idUser, items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0), session.id]
        );

        const sale_id = sales.insertId;

        // Insertar los artículos de la venta
        await Promise.all(items.map(item => 
            connection.execute(
                'INSERT INTO sales_items (sale_id, product_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)',
                [sale_id, item.productId || null, item.name || 'Nombre desconocido', item.price || 0, item.quantity || 1]
            )
        ));

        await connection.commit();

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error al crear la sesión de Stripe:', error);
        if (connection) {
            await connection.rollback();
        }
        res.status(500).json({ error: 'Error al crear la sesión de Stripe' });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};
