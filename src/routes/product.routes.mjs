import { Router } from 'express';
import uploadProduct from '../config/multerConfig.mjs'; // Ajusta la ruta según la estructura de tu proyecto
import { createProducts } from '../controllers/Product/createProduct.mjs';
import ImagesProduct from '../config/multerConfig/multerProduct.mjs';
import { deleteProduct } from '../controllers/product/deleteProduct.mjs';
import { getProducts } from "../controllers/product/getProducts.mjs";
import { getProductId } from "../controllers/product/getProductById.mjs"
import { updateProduct } from '../controllers/product/updateProduct.mjs';
import { authMiddleware } from "../JWT/authMiddleware.mjs";

const router = Router();

// Usar el middleware de multer para manejar la carga de imágenes
router.post('/product', authMiddleware, uploadProduct.fields(ImagesProduct), createProducts);
router.delete('/product/:id', authMiddleware, deleteProduct);
router.get('/product', getProducts);
router.get('/productById/:id', getProductId);
router.put('/product/:id', authMiddleware, uploadProduct.fields(ImagesProduct), updateProduct)


export default router;
