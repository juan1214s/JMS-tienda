import { Router } from "express";
import { getSalesByid } from "../controllers/sales/getSalesById.mjs";
import { getSales } from "../controllers/sales/getSales.mjs";
import { authMiddleware } from "../JWT/authMiddleware.mjs";

const route = Router();

route.get('/sales/:id', authMiddleware, getSalesByid);
route.get('/sales', authMiddleware, getSales);

export default route;
