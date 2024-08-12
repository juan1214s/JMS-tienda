import { Router } from "express";
import { createCart } from "../controllers/cart/createCart.mjs";
import { getCart } from "../controllers/cart/getCart.mjs";
import { deleteCart } from "../controllers/cart/deleteCart.mjs";

const router = Router();

router.post('/cart/:id', createCart);
router.get('/cart/:id', getCart);
router.delete('/cart/:id', deleteCart);
export default router;