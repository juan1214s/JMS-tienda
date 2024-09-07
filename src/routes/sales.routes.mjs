import { Router } from "express";
import { getSalesByid } from "../controllers/sales/getSalesById.mjs";
import { getSales } from "../controllers/sales/getSales.mjs";

const route = Router();

route.get('/sales/:id', getSalesByid);
route.get('/sales', getSales);

export default route;
