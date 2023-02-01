import { Request, Response } from "express";
import { getProducts, newProduct } from "../services/product.service";

export const newProductHandler = async (req: Request, res: Response) => {
    try {
        const productDto = req.body;
        const createdOne = await newProduct(productDto);
        return res.status(201).send({
            status: 'success'
        })
    } catch (error) {
        return res.status(400).send({
            status: 'failed',
            error
        })
    }
}

export const getProductsHandler = async (req: Request, res: Response) => {
    try {
        const products = await getProducts();
        return res.status(200).send({
            status: 'success',
            products
        });
    } catch (error) {
        return res.status(400).send({
            status: 'failed',
            error
        })
    }
}
