import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    icon: {type: String},
    color: {type: String}
});

export const Catetory = mongoose.model('Category', categorySchema);

export interface CategoryDto {
    name?: string;
    icon?: string;
    color?: string;
}
