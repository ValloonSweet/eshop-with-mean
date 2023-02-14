import { Router } from "express";
import { countProductsHandler, deleteProductByIdHandler, getProductByIdHandler, getProductsHandler, newProductHandler, updateProductByIdHandler, uploadGalleryImages } from "./controllers/product.controller";
import { deleteCategoryByIdHandler, getCategoriesHandler, getCategoryByIdHandler, newCategoryHandler, updateCategoryByIdHandler } from "./controllers/category.controller";
import { deleteUserByIdHandler, getUserByIdHandler, getUsersHandler, newUserHandler, updateUserByIdHandler } from "./controllers/user.controller";
import { loginHandler } from "./controllers/auth.controller";
import { restrictUser } from "./middleware/auth.middleware";
import { deleteOrderHandler, getOrderHandler, getOrdersByUser, getOrdersHandler, newOrderHandler, updateOrderHandler } from "./controllers/order.controller";

const BASE_API = process.env.BASE_API;


import multer from 'multer';

const FILE_TYPE_MAP: {[key: string]: string} = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError: Error | null = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/upload')
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
})

const uploadOptions = multer({storage})


const router = Router();

router.route(`${BASE_API}/login`)
    .post(loginHandler);

router.route(`${BASE_API}/products`)
    .get(getProductsHandler)
    .post(uploadOptions.single('image'), newProductHandler);

router.route(`${BASE_API}/gallery-images/:id`)
    .post(uploadOptions.array('images', 10), uploadGalleryImages);

router.route(`${BASE_API}/products/:id`)
    .get(getProductByIdHandler)
    .put(uploadOptions.single('image'), updateProductByIdHandler)
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

router.route(`${BASE_API}/orders`)
    .post(restrictUser, newOrderHandler)
    .get(restrictUser, getOrdersHandler);

router.route(`${BASE_API}/orders/:id`)
    .get(restrictUser, getOrderHandler)
    .put(restrictUser, updateOrderHandler)
    .delete(restrictUser, deleteOrderHandler)

router.route(`${BASE_API}/orders/user/:userid`)
    .get(restrictUser, getOrdersByUser)

export default router;
