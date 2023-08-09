import { getCartByIdService, addCartService, addProductToCartService, deleteProductToCartService, deleteCartService, updateCartService, updateQuantityCartService, purchaseCartService } from '../service/carts.service.js';
import { getProductsByIdService } from '../service/products.service.js'

const getCart = async (req, res) => {
    try {
        const cartID = req.params.cid;
        const cart = await getCartByIdService(cartID);
        if (!cart) {
            const cartError = 'cart not exist';
            req.logger.error(cartError);
            return res.sendClientError(cartError);
        }
        req.logger.info('successfully get cart');
        res.sendSuccess(cart);
    } catch (error) {
        req.logger.error('error get cart');
        res.sendServerError(error.message);
    }
}

const saveCart = async (req, res) => {

    try {
        const cart = { products: [] };
        const result = await addCartService(cart);
        req.logger.info('successfully save Cart');
        res.sendSuccess(result);
    } catch (error) {
        req.logger.error('error save cart');
        res.sendServerError(error.message);
    }
}

const addProductCart = async (req, res) => {

    try {
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const product = await getProductsByIdService(productID);
        if (!product) {
            const productError = 'Product not exist';
            req.logger.error(productError);
            return res.sendClientError(productError);
        }
        const cart = await getCartByIdService(cartID)
        if (!cart) {
            const cartError = 'Cart not exist';
            req.logger.error(cartError);
            return res.sendClientError(cartError);
        }
        if (product.owner === req.user._id && req.user.role === "PREMIUM") {
            const cartError = 'Error adding product';
            req.logger.error(cartError);
            return res.sendClientError(cartError);
        }
        const result = await addProductToCartService(cartID, productID)
        req.logger.info('product successfully saved in cart');
        res.sendSuccess(result);
    } catch (error) {
        req.logger.error('error save product in cart');
        res.sendServerError(error.message);
    }
}

const deleteProductCart = async (req, res) => {

    try {
        const cartID = req.params.cid;
        const productID = req.params.pid;

        const cart = await getCartByIdService(cartID);

        if (!cart) {
            const cartError = 'Cart not exist';
            req.logger.error(cartError);
            return res.sendClientError(cartError);
        }
        const result = await deleteProductToCartService(cartID, productID);
        req.logger.info('product successfully deleted from cart');
        res.sendSuccess(result);
    } catch (error) {
        req.logger.error('error product deleted from cart');
        res.sendServerError(error.message);
    }
}

const deleteCart = async (req, res) => {

    try {
        const cartID = req.params.cid;
        const cart = await getCartByIdService(cartID)
        if (!cart) {
            const cartError = 'Cart not exist';
            req.logger.error(cartError);
            return res.sendClientError(cartError);
        }
        const result = await deleteCartService(cartID);
        req.logger.info('successfully delete cart');
        res.sendSuccess(result);
    } catch (error) {
        req.logger.error('error delete cart');
        res.sendServerError(error.message);
    }
}

const updateCart = async (req, res) => {

    try {
        const cartID = req.params.cid;
        const productos = req.body;

        const cart = await getCartByIdService(cartID)
        if (!cart) {
            const cartError = 'Cart not exist';
            req.logger.error(cartError);
            return res.sendClientError(cartError);
        }
        const result = await updateCartService(cartID, productos);
        req.logger.info('successfully update cart');
        res.sendSuccess(result);
    } catch (error) {
        req.logger.error('error update cart');
        res.sendServerError(error.message);
    }
}

const updateQuantityCart = async (req, res) => {

    try {
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const quantity = req.body;

        const product = await getProductsByIdService(productID);
        if (!product) {
            const productError = 'Product not exist';
            req.logger.error(productError);
            return res.sendClientError(productError);
        }
        const cart = await getCartByIdService(cartID)
        if (!cart) {
            const cartError = 'Cart not exist';
            req.logger.error(cartError);
            return res.sendClientError(cartError);
        }

        const result = await updateQuantityCartService(cartID, productID, quantity);
        req.logger.info('successfully update quantity');
        res.sendSuccess(result);
    } catch (error) {
        req.logger.error('error update quantity');
        res.sendServerError(error.message);
    }
}
const purchaseCart = async (req, res) => {
    try {

        const cartID = req.params.cid;
        const cart = await getCartByIdService(cartID)
        if (!cart) {
            const cartError = 'Cart not exist';
            req.logger.error(cartError);
            return res.sendClientError(cartError);
        }
        if (cart.products.length === 0) {
            const cartError = 'empty cart';
            req.logger.error(cartError);
            return res.sendClientError(cartError);
        }
        const result = await purchaseCartService(req.user, cart);
        req.logger.info('successfully purchase');
        res.sendSuccess(result);

    } catch (error) {
        req.logger.error('error purchase');
        res.sendServerError(error.message);
    }
}

export {
    purchaseCart,
    getCart,
    saveCart,
    addProductCart,
    deleteProductCart,
    deleteCart,
    updateCart,
    updateQuantityCart
}