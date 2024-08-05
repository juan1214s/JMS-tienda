import { Router } from 'express';
import uploadProduct from '../config/multerConfig.mjs'; // Ajusta la ruta según la estructura de tu proyecto
import { createProducts } from '../controllers/Product/createProduct.mjs';
import ImagesProduct from '../config/multerConfig/multerProduct.mjs';
import { deleteProduct } from '../controllers/product/deleteProduct.mjs';
import { getProducts } from "../controllers/product/getProducts.mjs";
import { getProductId } from "../controllers/product/getProductId.mjs"
import { updateProduct } from '../controllers/product/updateProduct.mjs';

const router = Router();

// Usar el middleware de multer para manejar la carga de imágenes
router.post('/create', uploadProduct.fields(ImagesProduct), createProducts);
router.delete('/deleteProduct/:id', deleteProduct);
router.get('/getProducts', getProducts);
router.get('/getProductId/:id', getProductId);
router.put('/updateProduct/:id',uploadProduct.fields(ImagesProduct), updateProduct)


export default router;
