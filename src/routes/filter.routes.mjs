import {Router} from "express";
import { filterCategory } from "../controllers/filterCategory/filterCategory.mjs";

const router = Router();

router.get('/filterCategory', filterCategory);

export default router;