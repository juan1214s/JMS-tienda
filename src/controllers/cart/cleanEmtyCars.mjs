import cron from 'node-cron';
import { connectToDatabase } from "../../DB/db.mjs";
import { deleteBrandQuery, deleteCartQuery, emptyCartsQuery } from '../../DB/queries.mjs';

const cleanEmptyCarts = async () => {
    let connection;
    try {
        connection = await connectToDatabase();

        const [emptyCarts] = await connection.execute(
            emptyCartsQuery
        );

        if (emptyCarts.length > 0) {
            const cartIds = emptyCarts.map(cart => cart.id);
            await connection.execute(
                deleteCartQuery, [cartIds]
            );
        }
    } catch (error) {
        console.error(`Error al eliminar carritos vacíos: ${error}`);
    } finally {
        if (connection) {
            connection.end();
        }
    }
};

// Configurar el cron job para ejecutar el proceso de limpieza diariamente
cron.schedule('0 0 * * *', cleanEmptyCarts);  // Ejecutar a la medianoche cada día
