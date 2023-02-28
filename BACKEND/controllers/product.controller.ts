import { Request, Response } from "express";
import { countProducts, deleteById, getProductById, getProducts, newProduct, updateProductById } from "../services/product.service";
import { getCategoryById } from "../services/category.service";
import mongoose from "mongoose";

export const newProductHandler = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const category = await getCategoryById(req.body.category);
        if(!category) {
            return res.status(400).send({
                status: 'failed',
                msg: 'Invalid category'
            })
        }
        const productDto = req.body;
        const filename = req.file?.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/upload/`
        const createdOne = await newProduct({
            ...productDto,
            image: `${basePath}${filename}`
        });
        return res.status(201).send({
            status: 'success',
            product: createdOne
        })
    } catch (error) {
        return res.status(400).send({
            status: 'failed',
            error
        })
    }
}

export const uploadGalleryImages = async (req: Request, res: Response) => {
    const id = req.params.id;

    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).send({
            status: false,
            msg: 'Invalid Product Id'
        })
    }

    const files = req.files as Express.Multer.File[];
    let imagePaths: string[] = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;

    if(files && files.length > 0) {
        files.map((file: Express.Multer.File) => {
            imagePaths.push(`${basePath}${file.filename}`)
        })
    }

    const product = await updateProductById(id, {images: imagePaths});

    if(!product) {
        return res.status(400).send({
            status: false,
            msg: 'The product cannot be updated'
        })
    }

    return res.status(200).send({
        status: true
    })
}

export const getProductsHandler = async (req: Request, res: Response) => {
    try {
        let filter: any = {};
        if(req.query.categories) {
            const categories = req.query.categories as string;
            filter = {category: categories.split(',')};
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
        const id = req.params.id;
        if(!mongoose.isValidObjectId(id)) return res.status(400).send({
            status: false,
            msg: 'Invalid product id'
        })

        // const _category = await getCategoryById(req.body.category);
        // if(!_category) return res.status(400).send({
        //     status: false,
        //     msg: 'Invalid Category'
        // })

        const product = await getProductById(id);
        if(!product) return res.status(400).send({
            status: false,
            msg: 'Invalid Product'
        })

        const file = req.file;
        let imagePath;

        if(file) {
            const fileName = file.filename;
            const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;
            imagePath = `${basePath}${fileName}`;
        } else {
            imagePath = product.image;
        }
        const {category, ...body} = req.body;

        const updated = await updateProductById(req.params.id, {
            image: imagePath
        });
        if(!updated) {
            return res.status(404).send({
                status: false,
                msg: 'Not found product by id'
            })
        }

        return res.status(200).send({
            status: 'success'
        })
    } catch (error) {
        console.log(error);
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
