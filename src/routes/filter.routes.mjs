import {Router} from "express";
import { filterCategory } from "../controllers/filter/filterCategory.mjs";
import { filterBrand } from "../controllers/filter/filterBrand.mjs";

const router = Router();

router.get('/filterCategory', filterCategory);
router.get('/filterBrand', filterBrand)

export default router;