import { Router } from 'express';
import { getBrands } from '../controllers/brand/getBrands.mjs';
import { createBrand } from '../controllers/brand/createBrands.mjs';
import { deleteBrand } from '../controllers/brand/deleteBrand.mjs';
import { updateBrand } from '../controllers/brand/updateBrand.mjs';

const router = Router();

router.get('/getBrands', getBrands);
router.post('/createBrand', createBrand);
router.delete('/deleteBrand/:id', deleteBrand);
router.put('/updateBrand/:id', updateBrand);

export default router;