import {Router} from "express";
import { filterCategory } from "../controllers/filterCategory/filterCategory.mjs";
import { filterBrand } from "../controllers/filterCategory/filterBrand.mjs";

const router = Router();

router.get('/filterCategory', filterCategory);
router.get('/filterBrand', filterBrand)

export default router;