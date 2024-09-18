import { Router } from "express";
import { createUser } from "../controllers/users/createUser.mjs";
import { deleteUser } from "../controllers/users/deleteUser.mjs"
import { getUserById } from "../controllers/users/getUserById.mjs";
import { getUsers } from "../controllers/users/getUsers.mjs";
import { updateUser } from "../controllers/users/updateUserById.mjs";

const route = Router();

route.post('/users', createUser);
route.delete('/users/:id', deleteUser);
route.get('/users/:id', getUserById);
route.get('/users', getUsers);
route.put('/users/:id', updateUser)


export default route;