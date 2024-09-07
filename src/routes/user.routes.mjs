import { Router } from "express";
import { createUser } from "../controllers/users/createUser.mjs";

const route = Router();

route.post('/users', createUser);


export default route;