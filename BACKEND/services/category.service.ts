import { CategoryDto, Catetory } from "../models/categories.model";

export const newCategory = async (categoryDto: CategoryDto) => {
    return await Catetory.create(categoryDto);
}

export const getCategories = async () => {
    return await Catetory.find();
}

export const getCategoryById = async (id: string) => {
    return await Catetory.findById(id);
}

export const updateCategoryById = async (_id: string, dto: CategoryDto) => {
    return await Catetory.updateOne({_id}, dto);
}

export const deleteCategoryById = async (_id: string) => {
    return await Catetory.findByIdAndRemove(_id);
}
