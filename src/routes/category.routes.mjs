import { Router } from "express"
import { getCategory } from "../controllers/categorys/getCategory.mjs"
import { createCategory } from "../controllers/categorys/createCategory.mjs";
import { deleteCategory } from "../controllers/categorys/deleteCategory.mjs";
import { updateCategory } from "../controllers/categorys/updateCategory.mjs";
import { authMiddleware } from "../JWT/authMiddleware.mjs";

const router = Router();

// Obtener todas las categorías
router.get('/categories', getCategory);
// Crear una nueva categoría
router.post('/categories', authMiddleware, createCategory);
// Eliminar una categoría específica
router.delete('/categories/:id', authMiddleware, deleteCategory);
// Actualizar una categoría específica
router.put('/categories/:id', authMiddleware, updateCategory);

export default router;