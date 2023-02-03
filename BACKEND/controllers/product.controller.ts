import { Request, Response } from "express";
import { countProducts, deleteById, getProductById, getProducts, newProduct, updateProductById } from "../services/product.service";
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
        const filter = {category: []};
        if(req.query.categories) {
            const categories = req.query.categories as string;
            const filter = {category: categories.split(',')};
        }
        const products = await getProducts(filter);
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
        const updated = await updateProductById(req.params.id, req.body);
        if(!updated) {
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
        const deletedOne = await deleteById(req.params.id);
        if(!deletedOne) {
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

export const countProductsHandler = async (req: Request, res: Response) => {
    try {
        const count = await countProducts(req.body);
        return res.status(200).send({
            status: 'success',
            count
        })
    } catch (error) {
        return res.status(400).send({
            status: 'failed',
            error
        })
    }
}
