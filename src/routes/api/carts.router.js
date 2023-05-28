import { Router } from 'express';
import Carts from '../../dao/dbManager/carts.manager.js';
import Products from '../../dao/dbManager/products.manager.js';


const cartManager = new Carts();
const productManager = new Products();
const router = Router();

router.get('/:cid', async (req, res) => {
    try {
        const cartID = req.params.cid;
        const cart = await cartManager.getCartById(cartID);
        if (!cart) {
            return res.status(400).send({ error: 'Carrito no encontrado' });
        }
        res.send({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }

});

router.post('/', async (req, res) => {
    try {
        const cart = { products: [] };
        const result = await cartManager.addCarts(cart);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }

});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const product = await productManager.getProductById(productID);
        if (!product) {
            return res.status(400).send({ error: 'Producto no encontrado' });
        }
        const cart = await cartManager.getCartById(cartID)
        if (!cart) {
            return res.status(400).send({ error: 'Carrito no encontrado' });
        }
        const result = await cartManager.addProductToCart(cartID, productID)
        res.send({ status: 'success', pauload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const product = await productManager.getProductById(productID);
        if (!product) {
            return res.status(400).send({ error: 'Producto no encontrado' });
        }
        const cart = await cartManager.getCartById(cartID)
        if (!cart) {
            return res.status(400).send({ error: 'Carrito no encontrado' });
        }
        const result = await cartManager.deleteProductToCart(cartID, productID)
        res.send({ status: 'success', pauload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const cartID = req.params.cid;
        const cart = await cartManager.getCartById(cartID)
        if (!cart) {
            return res.status(400).send({ error: 'Carrito no encontrado' });
        }
        const result = await cartManager.deleteCart(cartID)
        res.send({ status: 'success', pauload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.put('/:cid', async (req, res) => {
    try {
        const cartID = req.params.cid;
        const productos = req.body;

        const cart = await cartManager.getCartById(cartID)
        if (!cart) {
            return res.status(400).send({ error: 'Carrito no encontrado' });
        }
        const result = await cartManager.updateCart(cartID,productos);
        res.send({ status: 'success', pauload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const quantity = req.body;

        const product = await productManager.getProductById(productID);
        if (!product) {
            return res.status(400).send({ error: 'Producto no encontrado' });
        }
        const cart = await cartManager.getCartById(cartID)
        if (!cart) {
            return res.status(400).send({ error: 'Carrito no encontrado' });
        }

        const result = await cartManager.updateQuantityCart(cartID,productID,quantity);
        res.send({ status: 'success', pauload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});


export default router;