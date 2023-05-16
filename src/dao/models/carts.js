import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    products: [
        {
            product: Number,
            quantity: Number
        }
    ]
});

export const cartsModel = mongoose.model(cartCollection, cartsSchema)