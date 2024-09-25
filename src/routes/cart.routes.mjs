import { Router } from "express";
import { createCart } from "../controllers/cart/createCart.mjs";
import { getCart } from "../controllers/cart/getCart.mjs";
import { deleteCart } from "../controllers/cart/deleteCart.mjs";
import { updateQuantity } from "../controllers/cart/updateQuantity.mjs";
import { authMiddleware } from "../JWT/authMiddleware.mjs";

const router = Router();

router.post('/cart/:id', authMiddleware, createCart);
router.get('/cart/:id', getCart);
router.delete('/cart/:id', authMiddleware, deleteCart);
router.put('/cart/:id', authMiddleware, updateQuantity);

export default router;