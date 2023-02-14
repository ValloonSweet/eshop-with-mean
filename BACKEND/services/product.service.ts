import { Product, ProductDto } from "../models/products.model";


export const newProduct = async (productDto: ProductDto) => {
    console.log(productDto);
    return await Product.create(productDto);
}

export const getProducts = async (filter: {category: string[]}) => {
    return await Product.find(filter).populate('category');
}

export const getProductById = async (id: string) => {
    return await Product.findById(id).populate('category');
}

export const updateProductById = async (id: string, dto: ProductDto) => {
    return await Product.findByIdAndUpdate(id, dto, {new: true, strict: false}).populate('category');
}

export const deleteById = async (id: string) => {
    return await Product.findByIdAndDelete(id);
}

export const countProducts = async (condition: ProductDto) => {
    return await Product.count(condition);
}
