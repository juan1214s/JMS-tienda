import { Router } from "express";
import { createStripe } from "../controllers/stripe/createStripe.mjs"

const route = Router();

route.post('/create-stripe/:id', createStripe)

export default route;