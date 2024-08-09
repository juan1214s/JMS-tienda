import { Router } from "express";
import { createCart } from "../controllers/cart/createCart.mjs";

const router = Router();

router.post('/cart/:id/items', createCart);

export default router;