import { connectToDatabase } from '../../DB/db.mjs';
import { insertImageQuery, insertProductQuery} from "../../DB/queries.mjs"

export const createProducts = async (req, res) => {
  let connection;
  try {
    const { name, description, price, model, stock, brand_id, category_id } = req.body;
    //verifica si esta vacio o contiene un archivo
    const files = req.files && req.files['images'] ? req.files['images'] : [];
  
    // Verificar si el precio es válido
    if (isNaN(price)) {
      return res.status(400).json({ error: 'Precio inválido' });
    }

    connection = await connectToDatabase();

    // Iniciar transacción significa q los datos se van a guardar a la vez, todo en una operacion
    await connection.beginTransaction();

    // Insertar producto y las llaves son porq mysql2 devuelve un array
    const [productResult] = await connection.execute(
      insertProductQuery,
      [name, description, price, model, stock, brand_id, category_id]
    );

    //insertId es una propieda de mysql2 q devuelve el id del producto q se inserto
    const productId = productResult.insertId;

    // Insertar imágenes, mapea files para obtener el path osea la ruta donde esta la imagenes
    const imageInsertPromises = files.map(file =>
      connection.execute(
        insertImageQuery,
        [productId, file.path]
      )
    );

    //indica q se van a guardar todas las imagenes, ya q en la peticion pueden venir muchas imagenes a la vez
    await Promise.all(imageInsertPromises);

    // Confirmar transacción
    await connection.commit();

    res.status(201).json({ message: 'Producto creado exitosamente', productId });
  } catch (error) {
    console.error('Error al crear producto:', error);
    if (connection) {
      //para la insercion en ambas tablas si algo sale mal
      await connection.rollback();
    }
    res.status(500).json({ error: 'Error al crear producto' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
};
