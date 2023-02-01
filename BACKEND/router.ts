import { Router } from "express";
import { deleteProductByIdHandler, getProductByIdHandler, getProductsHandler, newProductHandler, updateProductByIdHandler } from "./controllers/product.controller";
import { deleteCategoryByIdHandler, getCategoriesHandler, getCategoryByIdHandler, newCategoryHandler, updateCategoryByIdHandler } from "./controllers/category.controller";

const BASE_API = process.env.BASE_API;

const router = Router();
router.route(`${BASE_API}/products`)
    .get(getProductsHandler)
    .post(newProductHandler);

router.route(`${BASE_API}/products/:id`)
    .get(getProductByIdHandler)
    .put(updateProductByIdHandler)
    .delete(deleteProductByIdHandler);

router.route(`${BASE_API}/categories`)
    .get(getCategoriesHandler)
    .post(newCategoryHandler);

router.route(`${BASE_API}/categories/:id`)
    .get(getCategoryByIdHandler)
    .put(updateCategoryByIdHandler)
    .delete(deleteCategoryByIdHandler)

export default router;
