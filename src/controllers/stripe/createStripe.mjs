import Stripe from 'stripe';

// Usa tu clave secreta real aquí
const stripe = new Stripe('sk_test_51OvpUi2LHwPQKUjhMEjIA1lOIWwZsa5L64RuB86txCMuH8aH0TyFNUUom4p28lVg3TrG4tONyhSyB5dR2jOxkFFy00yOaQV2os', { apiVersion: '2022-11-15' });

export const createStripe = async (req, res) => {
    const { items } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'cop',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100, // El precio debe estar en centavos
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: 'http://localhost:3000/success', // Cambia esta URL según tu configuración
            cancel_url: 'http://localhost:3000/cancel',   // Cambia esta URL según tu configuración
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error al crear la sesión de Stripe:', error);
        res.status(500).send('Error al crear la sesión de Stripe');
    }
};
