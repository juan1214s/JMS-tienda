import { connectToDatabase } from '../../db.mjs';

export const createProducts = async (req, res) => {
  const { name, description, price } = req.body;
  const files = req.files && req.files['images'] ? req.files['images'] : []; // Maneja el caso cuando req.files es undefined

  // Convertir el precio a decimal
  const parsedPrice = parseFloat(price);

  // Verificar si el precio es válido
  if (isNaN(parsedPrice)) {
    return res.status(400).json({ error: 'Precio inválido' });
  }

  try {
    const connection = await connectToDatabase();

    // Iniciar transacción
    await connection.beginTransaction();

    // Insertar producto
    const [productResult] = await connection.execute(
      'INSERT INTO product (name, description, price) VALUES (?, ?, ?)',
      [name, description, parsedPrice] // Usar parsedPrice en lugar de price
    );
    const productId = productResult.insertId;

    // Insertar imágenes
    const imageInsertPromises = files.map(file =>
      connection.execute(
        'INSERT INTO image (product_id, file_path) VALUES (?, ?)',
        [productId, file.path]
      )
    );

    await Promise.all(imageInsertPromises);

    // Confirmar transacción
    await connection.commit();
    connection.end(); // Cierra la conexión

    res.status(201).json({ message: 'Producto creado exitosamente', productId });
  } catch (error) {
    console.error('Error al crear producto:', error);
    await connection.rollback(); // Revertir transacción en caso de error
    res.status(500).json({ error: 'Error al crear producto' });
  }
};
