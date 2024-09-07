import { Router } from "express";
import { createStripe } from "../controllers/stripe/createStripe.mjs"
import { handleSuccess } from "../controllers/stripe/verifyPayment.mjs";

const route = Router();

route.post('/create-stripe/:id', createStripe);
route.post('/verify-stripe', handleSuccess);

export default route;