import { Router } from "express";
import { createStripe } from "../controllers/stripe/createStripe.mjs"
import { handleSuccess } from "../controllers/stripe/verifyPayment.mjs";
import { authMiddleware } from "../JWT/authMiddleware.mjs";

const route = Router();

route.post('/create-stripe/:id', authMiddleware, createStripe);
route.post('/verify-stripe', authMiddleware, handleSuccess);

export default route;