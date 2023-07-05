import { CARTSDAO } from '../dao/index.js';

const getCartByIdService = async (cid) => {
    const result = await CARTSDAO.getCartById(cid);
    return result;
}

const addCartService = async (cart) => {
    const result = await CARTSDAO.addCarts(cart);
    return result;
}

const addProductToCartService = async (cid,pid) => {
    const result = await CARTSDAO.addProductToCart(cid,pid);
    return result;
}

const deleteProductToCartService = async (cid,pid) => {
    const result = await CARTSDAO.deleteProductToCart(cid,pid);
    return result;
}

const deleteCartService = async (cid) => {
    const result = await CARTSDAO.deleteCart(cid);
    return result;
}

const updateCartService = async (cid,products) => {
    const result = await CARTSDAO.updateCart(cid,products);
    return result;
}

const updateQuantityCartService = async (cid,pid,quantity) => {
    const result = await CARTSDAO.updateQuantityCart(cid,pid,quantity);
    return result;
}


export{
    addCartService,
    getCartByIdService,
    addProductToCartService,
    deleteProductToCartService,
    deleteCartService,
    updateCartService,
    updateQuantityCartService
}