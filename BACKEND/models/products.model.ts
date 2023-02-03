import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, default: ''},
    richDescription: {type: String, default: ''},
    image: String,
    images: [{  type: String, default: ''}],
    brand: {type: String, default: ''},
    price: {type: Number, default: ''},
    category: {type: mongoose.Types.ObjectId, ref: 'Category', required: true},
    countInStock: {type: Number, required: true, min: 0, max: 255},
    rating: {type: Number, default: 0},
    numReviews: { type: Number, default: 0},
    isFeatured: {type: Boolean, default: false},
    dateCreated: {type: Date, default: Date.now()}
});

productSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

productSchema.set('toJSON', {virtuals: true});

export const Product = mongoose.model('PRODUCT', productSchema);

export interface ProductDto {
    name?: string;
    description?: string;
    image?: string;
    countInStock?: number;
    brand?: string;
    price?: number;
    rating?: number;
    numReviews?: number;
    isFeatured?: boolean;
}
