import { Request, Response } from "express";
import { deleteById, getProductById, getProducts, newProduct, updateProductById } from "../services/product.service";
import { getCategoryById } from "../services/category.service";

export const newProductHandler = async (req: Request, res: Response) => {
    try {
        const category = await getCategoryById(req.body.category);
        if(!category) {
            return res.status(400).send({
                status: 'failed',
                msg: 'Invalid category'
            })
        }
        const productDto = req.body;
        const createdOne = await newProduct(productDto);
        return res.status(201).send({
            status: 'success',
            category: createdOne
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

export const getProductByIdHandler = async (req: Request, res: Response) => {
    try {
        const product = await getProductById(req.params.id);
        if(!product) {
            return res.status(404).send({
                status: 'failed',
                msg: 'Not found product by id'
            })
        }
        return res.status(200).send({
            status: 'success',
            product
        })
    } catch (error) {
        return res.status(400).send({
            status: 'failed',
            error
        })
    }
}

export const updateProductByIdHandler = async (req: Request, res: Response) => {
    try {
        const updatedResult = await updateProductById(req.params.id, req.body);
        console.log(updatedResult);
        if(updatedResult.matchedCount < 1) {
            return res.status(404).send({
                status: 'failed',
                msg: 'Not found product by id'
            })
        }

        return res.status(200).send({
            status: 'success'
        })
    } catch (error) {
        return res.status(400).send({
            status: 'failed',
            error
        })
    }
}

export const deleteProductByIdHandler = async (req: Request, res: Response) => {
    try {
        const deletedResult = await deleteById(req.params.id);
        if(deletedResult.deletedCount < 1) {
            return res.status(404).send({
                status: 'failed',
                msg: 'Not found product by ID'
            })
        }
        return res.status(200).send({
            status: 'success'
        })
    } catch (error) {
        return res.status(400).send({
            status: 'failed',
            error
        })
    }
}
