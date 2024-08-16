import Stripe from 'stripe';
import mysql from 'mysql2/promise';

// Configura Stripe con tu clave secreta
const stripe = new Stripe('sk_test_51OvpUi2LHwPQKUjhMEjIA1lOIWwZsa5L64RuB86txCMuH8aH0TyFNUUom4p28lVg3TrG4tONyhSyB5dR2jOxkFFy00yOaQV2os', { apiVersion: '2022-11-15' });

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nombre_de_tu_base_de_datos',
    password: 'tu_contraseña'
});

export const handleSuccess = async (req, res) => {
    const { session_id } = req.query;

    if (!session_id) {
        return res.status(400).send('No session_id provided');
    }

    try {
        // Verifica la sesión con Stripe
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === 'paid') {
            // Actualiza el estado del pedido en la base de datos
            const connection = await pool.getConnection();
            await connection.query('START TRANSACTION');

            await connection.query(
                'UPDATE ventas SET status = ? WHERE session_id = ?',
                ['paid', session_id]
            );

            await connection.query('COMMIT');
            connection.release();

            res.send('Pago exitoso y venta actualizada.');
        } else {
            res.status(400).send('El pago no se completó.');
        }
    } catch (error) {
        console.error('Error al verificar el estado de la sesión:', error);
        res.status(500).send('Error al verificar el estado de la sesión');
    }
};
