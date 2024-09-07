import { Router } from "express";
import { login } from "../controllers/login/login.mjs";

const route = Router();

route.post('/login', login);

export default route;