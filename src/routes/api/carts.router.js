import { Router } from 'express';
import Carts from '../../dao/dbManager/carts.js';
import Products from '../../dao/dbManager/products.js';


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

export default router;