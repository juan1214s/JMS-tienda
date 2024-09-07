import Stripe from 'stripe';
import { connectToDatabase } from "../../DB/db.mjs";

// Configura Stripe con tu clave secreta
const stripe = new Stripe('sk_test_51OvpUi2LHwPQKUjhMEjIA1lOIWwZsa5L64RuB86txCMuH8aH0TyFNUUom4p28lVg3TrG4tONyhSyB5dR2jOxkFFy00yOaQV2os', { apiVersion: '2022-11-15' });

export const handleSuccess = async (req, res) => {
    let connection;
    try {
        const { session_id } = req.body;

        if (!session_id) {
            return res.status(400).send('No session_id provided');
        }

        connection = await connectToDatabase();

        // Verifica la sesión con Stripe
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === 'paid') {
            // Inicia una transacción
            await connection.beginTransaction();

            // Actualiza el estado del pedido en la base de datos
            await connection.query(
                'UPDATE ventas SET status = ? WHERE session_id = ?',
                ['paid', session_id]
            );

            // Confirma la transacción
            await connection.commit();

            res.send('Pago exitoso y venta actualizada.');
        } else {
            res.status(400).send('El pago no se completó.');
        }
    } catch (error) {
        if (connection) {
            await connection.rollback(); // Revertir la transacción en caso de error
        }
        console.error('Error al verificar el estado de la sesión:', error);
        res.status(500).send('Error al verificar el estado de la sesión');
    } finally {
        if (connection) {
            await connection.end(); // Cierra la conexión a la base de datos
        }
    }
};
