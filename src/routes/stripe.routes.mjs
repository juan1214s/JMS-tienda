import { Router } from "express";
import { createStripe } from "../controllers/stripe/createStripe.mjs"

const route = Router();

route.post('/create-stripe', createStripe)

export default route;