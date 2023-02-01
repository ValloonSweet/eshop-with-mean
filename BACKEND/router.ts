import { Router } from "express";
import { getProductsHandler, newProductHandler } from "./controllers/product.controller";

const BASE_API = process.env.BASE_API;

const router = Router();
router.route(`${BASE_API}/products`)
    .get(getProductsHandler)
    .post(newProductHandler);

export default router;
