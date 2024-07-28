import { Router } from 'express';
import { getBrands } from '../controllers/brand/getBrands.mjs';

const roter = Router();

roter.get('/getBrands', getBrands);

export default roter;