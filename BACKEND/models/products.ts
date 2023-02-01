import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
});

export const Product = mongoose.model('PRODUCT', productSchema);

export interface ProductDto {
    name: string;
    image: string;
    countInStock: number
}
