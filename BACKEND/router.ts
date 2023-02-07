import { Router } from "express";
import { countProductsHandler, deleteProductByIdHandler, getProductByIdHandler, getProductsHandler, newProductHandler, updateProductByIdHandler } from "./controllers/product.controller";
import { deleteCategoryByIdHandler, getCategoriesHandler, getCategoryByIdHandler, newCategoryHandler, updateCategoryByIdHandler } from "./controllers/category.controller";
import { deleteUserByIdHandler, getUserByIdHandler, getUsersHandler, newUserHandler, updateUserByIdHandler } from "./controllers/user.controller";
import { loginHandler } from "./controllers/auth.controller";
import { restrictUser } from "./middleware/auth.middleware";

const BASE_API = process.env.BASE_API;

const router = Router();

router.route(`${BASE_API}/login`)
    .post(restrictUser, loginHandler);

router.route(`${BASE_API}/products`)
    .get(getProductsHandler)
    .post(newProductHandler);

router.route(`${BASE_API}/products/:id`)
    .get(getProductByIdHandler)
    .put(updateProductByIdHandler)
    .delete(deleteProductByIdHandler);

router.route(`${BASE_API}/products/get/count`)
    .get(countProductsHandler);

router.route(`${BASE_API}/categories`)
    .get(getCategoriesHandler)
    .post(newCategoryHandler);

router.route(`${BASE_API}/categories/:id`)
    .get(getCategoryByIdHandler)
    .put(updateCategoryByIdHandler)
    .delete(deleteCategoryByIdHandler)

router.route(`${BASE_API}/users`)
    .get(getUsersHandler)
    .post(newUserHandler);

router.route(`${BASE_API}/users/:id`)
    .get(getUserByIdHandler)
    .put(updateUserByIdHandler)
    .delete(deleteUserByIdHandler);

export default router;
