import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    products: [
        {
            product: String,
            quantity: Number
        }
    ]
});

export const cartModel = mongoose.model(cartCollection, cartsSchema)