import { Carts } from '../dao/factory.js'

export default class CartsRepository {
    constructor() {
        this.dao = Carts;
    }
    getCartById = async (cid) => {
        const result = await this.dao.getCartById(cid);
        return result;
    }
    addCart = async (cart) => {
        const result = await this.dao.addCarts(cart);
        return result;
    }
    addProductToCart = async (cid,pid) => {
        const result = await this.dao.addProductToCart(cid,pid);
        return result;
    }
    deleteProductToCart = async (cid,pid) => {
        const result = await this.dao.deleteProductToCart(cid,pid);
        return result;
    }
    deleteCart = async (cid) => {
        const result = await this.dao.deleteCart(cid);
        return result;
    }
    updateCart = async (cid,pid,quantity) => {
        const result = await this.dao.updateQuantityCart(cid,pid,quantity);
        return result;
    }
}