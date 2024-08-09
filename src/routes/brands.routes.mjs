import { Router } from 'express';
import { getBrands } from '../controllers/brand/getBrands.mjs';
import { createBrand } from '../controllers/brand/createBrands.mjs';
import { deleteBrand } from '../controllers/brand/deleteBrand.mjs';
import { updateBrand } from '../controllers/brand/updateBrand.mjs';

const router = Router();

// Ruta para obtener todas las marcas
router.get('/brands', getBrands);
// Ruta para crear una nueva marca
router.post('/brands', createBrand);
// Ruta para eliminar una marca específica por su ID
router.delete('/brands/:id', deleteBrand);
// Ruta para actualizar una marca específica por su ID
router.put('/brands/:id', updateBrand);

export default router;
