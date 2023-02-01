import { Product, ProductDto } from "../models/products.model";

export const newProduct = async (productDto: ProductDto) => {
    return await Product.create(productDto);
}

export const getProducts = async () => {
    return await Product.find();
}

export const getProductById = async (id: string) => {
    return await Product.findById(id);
}

export const updateProductById = async (id: string, dto: ProductDto) => {
    return await Product.updateOne({_id: id}, dto);
}

export const deleteById = async (id: string) => {
    return await Product.deleteOne({_id: id});
}
