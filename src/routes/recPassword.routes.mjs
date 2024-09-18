import { Router } from "express";
import { recoverPassword } from "../controllers/recoverPassword/recoverPassword.mjs";

const route = Router();

route.post('/recover-password',recoverPassword );

export default route;