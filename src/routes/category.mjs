import { Router } from "express"
import { getCategory } from "../controllers/categorys/getCategory.mjs"
import { createCategory } from "../controllers/categorys/createCategory.mjs";
import { deleteCategory } from "../controllers/categorys/deleteCategory.mjs";
import { updateCategory } from "../controllers/categorys/updateCategory.mjs";

const router = Router();

router.get('/getCategory', getCategory);
router.post('/createCategory', createCategory);
router.delete('/deleteCategory/:id', deleteCategory);
router.put('/updateCategory/:id', updateCategory);

export default router;