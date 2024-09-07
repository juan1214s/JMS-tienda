import { connectToDatabase } from '../../DB/db.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { deleteProductQuery, getsAssociatedImagesQuery, validateProductExistsQuery, deleImagesQuery } from "../../DB/queries.mjs";

// Convierte la URL del módulo en una ruta de archivo.
const __filename = fileURLToPath(import.meta.url);
// Obtiene el directorio que contiene el archivo actual.
const __dirname = path.dirname(__filename);

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const productId = Number(id);
  if (isNaN(productId)) {
    return res.status(400).json({ error: 'ID de producto inválido' });
  }

  let connection;
  try {
    connection = await connectToDatabase();

    // Iniciar transacción
    await connection.beginTransaction();

    const [productExists] = await connection.execute(validateProductExistsQuery, [productId]);

    if (productExists.length === 0) {
      return res.status(404).json({ message: "No se encontró el producto" });
    }

    // Obtener las rutas de las imágenes asociadas
    const [rows] = await connection.execute(getsAssociatedImagesQuery, [productId]);

    // Eliminar las imágenes del sistema de archivos
    rows.forEach(row => {
      // Construir la ruta completa del archivo
      const filePath = path.resolve(__dirname, '../../../', row.file_path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        console.warn(`Archivo no encontrado: ${filePath}`);
      }
    });

    // Eliminar las imágenes de la base de datos
    await connection.execute(deleImagesQuery, [productId]);

    // Eliminar el producto
    await connection.execute(deleteProductQuery, [productId]);

    // Confirmar transacción
    await connection.commit();

    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);

    if (connection) {
      await connection.rollback();
    }

    res.status(500).json({ error: 'Error al eliminar el producto' });
  } finally {
    // Cerrar la conexión a la base de datos
    if (connection) {
      await connection.end();
    }
  }
};
