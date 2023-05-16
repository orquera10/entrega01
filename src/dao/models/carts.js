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

export const cartModel = mongoose.model(cartCollection, cartsSchema)