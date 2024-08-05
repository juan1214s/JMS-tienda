import { Router } from "express"
import { getCategory } from "../controllers/categorys/getCategory.mjs"

const router = Router();

router.get('/getCategory', getCategory)

export default router;