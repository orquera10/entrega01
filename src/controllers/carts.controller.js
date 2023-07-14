import { getCartByIdService, addCartService, addProductToCartService, deleteProductToCartService, deleteCartService, updateCartService, updateQuantityCartService, purchaseCartService } from '../service/carts.service.js';
import { getProductsByIdService } from '../service/products.service.js'

const getCart = async (req, res) => {
    try {
        const cartID = req.params.cid;
        const cart = await getCartByIdService(cartID);
        if (!cart) {
            return res.status(400).send({ error: 'Carrito no encontrado' });
        }
        res.sendSuccess(cart);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const saveCart = async (req, res) => {

    try {
        const cart = { products: [] };
        const result = await addCartService(cart);

        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const addProductCart = async (req, res) => {

    try {
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const product = await getProductsByIdService(productID);
        if (!product) {
            return res.status(400).send({ error: 'Producto no encontrado' });
        }
        const cart = await getCartByIdService(cartID)
        if (!cart) {
            return res.status(400).send({ error: 'Carrito no encontrado' });
        }
        const result = await addProductToCartService(cartID, productID)

        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const deleteProductCart = async (req, res) => {

    try {
        const cartID = req.params.cid;
        const productID = req.params.pid;

        const cart = await getCartByIdService(cartID);

        if (!cart) {
            return res.status(400).send({ error: 'Carrito no encontrado' });
        }
        const result = await deleteProductToCartService(cartID, productID)
        res.sendSuccess(result);
    } catch (error) {
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