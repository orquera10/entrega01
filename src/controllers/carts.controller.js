import { getCartByIdService, addCartService, addProductToCartService, deleteProductToCartService, deleteCartService, updateCartService, updateQuantityCartService, purchaseCartService } from '../service/carts.service.js';
import { getProductsByIdService } from '../service/products.service.js'

const getCart = async (req, res) => {
    try {
        const cartID = req.params.cid;
        const cart = await getCartByIdService(cartID);
        if (!cart) {
            const cartError = 'Cart not exist';
            req.logger.error(cartError);
            return res.sendClientError(cartError);
        }
        req.logger.info('correct getCart');
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
        req.logger.info('correct save Cart');
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
            return res.status(400).send({ error: 'Carrito no encontrado' });
        }
        const result = await deleteCartService(cartID)
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const updateCart = async (req, res) => {

    try {
        const cartID = req.params.cid;
        const productos = req.body;

        const cart = await getCartByIdService(cartID)
        if (!cart) {
            return res.status(400).send({ error: 'Carrito no encontrado' });
        }
        const result = await updateCartService(cartID, productos);
        res.sendSuccess(result);
    } catch (error) {
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
            return res.status(400).send({ error: 'Producto no encontrado' });
        }
        const cart = await getCartByIdService(cartID)
        if (!cart) {
            return res.status(400).send({ error: 'Carrito no encontrado' });
        }

        const result = await updateQuantityCartService(cartID, productID, quantity);
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    }
}
const purchaseCart = async (req,res) => {
    try {
        
        const cartID = req.params.cid;
        const cart = await getCartByIdService(cartID)
        if (!cart) {
            return res.status(400).send({ error: 'Carrito no encontrado' });
        }
        if (cart.product === []) {
            return res.status(400).send({ error: 'Carrito vacio' });
        }
        const result = await purchaseCartService(req.user, cart);
        res.sendSuccess(result);   

    } catch (error) {
        res.sendServerError(error.message);
    }
}

export{
    purchaseCart,
    getCart,
    saveCart,
    addProductCart,
    deleteProductCart,
    deleteCart,
    updateCart,
    updateQuantityCart
}