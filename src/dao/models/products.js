import mongoose from 'mongoose';

const productCollections = 'products';

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    thumbnail: String
});

export const userModel = mongoose.model(productCollections, productsSchema);