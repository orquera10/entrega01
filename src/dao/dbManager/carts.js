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

    getCartById = async (id) =>{
        const result = await cartModel.find({_id:id}).lean();
        return result;
    }

    addProductToCart = async (cartId, productId) =>{
        const cart = await cartModel.findById(cartId);
        const existingProductIndex = cart.products.findIndex((item) => item.product.toString() === productId);

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += 1;
        } else {
            cart.products.push({ product: productId});
        }

        await cart.save();

        return cart;
    }

    deleteProductToCart = async (cid, pid) => {
        const cart = await cartModel.findById(cid);
        const existingProductIndex = cart.products.findIndex((item) => item.product.toString() === pid);
        if (existingProductIndex !== -1) {
            cart.products.splice(existingProductIndex, 1);
            // cart.products[existingProductIndex].quantity = 0;
        } else {
            console.log('No existe');
        }

        await cart.save();

        return cart;
    }

    deleteCart = async (cid) => {
        const cart = await cartModel.findById(cid);
        cart.products = [];

        await cart.save();

        return cart;
    }

    updateCart = async (id, product) =>{
        const result = await cartModel.updateOne({_id:id}, product);
        return result;
    }

    updateQuantityCart = async (cid,pid,cantidad) =>{
        const cart = await cartModel.findById(cid);
        const existingProductIndex = cart.products.findIndex((item) => item.product.toString() === pid);
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity = cantidad.quantity;
        } else {
            console.log('No existe');
        }

        await cart.save();

        return cart;
    }
}