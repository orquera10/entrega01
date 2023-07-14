import CartsRepository from '../repositories/carts.repository.js';

const cartsRepository = new CartsRepository();

const getCartByIdService = async (cid) => {
    const result = await cartsRepository.getCartById(cid);
    return result;
}

const addCartService = async (cart) => {
    const result = await cartsRepository.addCarts(cart);
    return result;
}

const addProductToCartService = async (cid,pid) => {
    const result = await cartsRepository.addProductToCart(cid,pid);
    return result;
}

const deleteProductToCartService = async (cid,pid) => {
    const result = await cartsRepository.deleteProductToCart(cid,pid);
    return result;
}

const deleteCartService = async (cid) => {
    const result = await cartsRepository.deleteCart(cid);
    return result;
}

const updateCartService = async (cid,products) => {
    const result = await cartsRepository.updateCart(cid,products);
    return result;
}

const updateQuantityCartService = async (cid,pid,quantity) => {
    const result = await cartsRepository.updateQuantityCart(cid,pid,quantity);
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