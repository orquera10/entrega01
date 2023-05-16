import { cartModel } from "../models/carts.js";

export default class Carts {
    constructor() {
        console.log('Working carts with DB in mongoDB');
    }
    getCarts = async () => {
        const carts = await cartModel.find().lean();
        return carts;
    }

    addCarts = async (cart) => {
        const result = await cartModel.create(cart);
        return result;
    }

    getCarttById = async (id) =>{
        const result = await cartModel.find({_id:id}).lean();
        return result;
    }

    addProductToCart = async (cartId, productId) =>{
        const cart = await cartModel.findById(cartId);
        const existingProductIndex = cart.products.findIndex((item) => item.product.toString() === productId);

        if (existingProductIndex !== -1) {
            cart.productList[existingProductIndex].quantity += 1;
        } else {
            cart.productList.push({ product: productId, quantity: 1 });
        }

        await cart.save();

        return cart;
    }
}