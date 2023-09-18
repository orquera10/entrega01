import { cartModel } from "../dbManager/models/carts.model.js";

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
        const result = await cartModel.findOne({_id:id}).lean();
        return result;
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
}