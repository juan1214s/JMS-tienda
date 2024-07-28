import { Router } from 'express';
import uploadProduct from '../config/multerConfig.mjs'; // Ajusta la ruta según la estructura de tu proyecto
import { createProducts } from '../controllers/Product/createProduct.mjs';
import ImagesProduct from '../config/multerConfig/multerProduct.mjs';
import { deleteProduct } from '../controllers/product/deleteProduct.mjs';

const router = Router();

// Usar el middleware de multer para manejar la carga de imágenes
router.post('/create', uploadProduct.fields(ImagesProduct), createProducts);
router.delete('/deleteProduct/:id', deleteProduct);

export default router;
