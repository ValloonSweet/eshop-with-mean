import { Request, Response } from "express";
import { deleteCategoryById, getCategories, getCategoryById, newCategory, updateCategoryById } from "../services/category.service";

export const newCategoryHandler = async (req: Request, res: Response) => {
    try {
        const createdOne = await newCategory(req.body);
        return res.status(201).send({
            status: 'success',
            category: {
                id: createdOne.id,
                name: createdOne.name,
                icon: createdOne.icon,
                color: createdOne.color
            }
        });
    } catch (error) {
        return res.status(400).send({
            status: 'failed',
            error
        })
    }
}

export const getCategoriesHandler = async (req: Request, res: Response) => {
    try {
        const categories = await getCategories();
        return res.status(200).send({
            status: 'success',
            categories
        })
    } catch (error) {
        return res.status(400).send({
            status: 'failed',
            error
        })
    }
}

export const getCategoryByIdHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const category = await getCategoryById(id);
        if(!category) {
            return res.status(404).send({
                status: 'failed',
                error: `Cannot find the category with id ${id}`
            })
        }
        return res.status(200).send({
            status: 'success',
            category
        })
    } catch (error) {
        return res.status(400).send({
            status: 'failed',
            error
        })
    }
}

export const updateCategoryByIdHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await updateCategoryById(id, req.body);
        if (result.matchedCount < 1) {
            return res.status(404).send({
                status: 'failed',
                error: `Cannot find the category with id ${id}`
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

export const deleteCategoryByIdHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await deleteCategoryById(id);
        return res.status(200).send({
            status: 'success',
        })
    } catch (error) {
        return res.status(400).send({
            status: 'failed',
            error
        })
    }
}
