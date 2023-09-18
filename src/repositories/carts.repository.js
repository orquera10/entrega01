import { Carts } from '../dao/factory.js'

export default class CartsRepository {
    constructor() {
        this.dao = Carts;
    }
    getCartById = async (cid) => {
        const result = await this.dao.getCartById(cid);
        return result;
    }
    addCarts = async (cart) => {
        const result = await this.dao.addCarts(cart);
        return result;
    }
    deleteCart = async (cid) => {
        const result = await this.dao.deleteCart(cid);
        return result;
    }
    updateCart = async (cid,product) => {
        const result = await this.dao.updateCart(cid,product);
        return result;
    }
}