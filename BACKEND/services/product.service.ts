import { Product, ProductDto } from "../models/products";

export const newProduct = async (productDto: ProductDto) => {
    return await Product.create(productDto);
}

export const getProducts = async () => {
    return await Product.find();
}
