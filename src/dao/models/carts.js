import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'products'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
});

export const cartModel = mongoose.model(cartCollection, cartsSchema);