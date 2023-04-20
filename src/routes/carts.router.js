import { Router } from 'express';
import CartManager from '../managers/CartManager.js';
import ProductManager from '../managers/ProductManager.js';

const cartManager = new CartManager("./src/data/Carts.json");
const productManager = new ProductManager("./src/data/Products.json");
const router = Router();

router.get('/:cid', async (req, res) => {
    const cartID = Number(req.params.cid);
    const cart = await cartManager.getCartById(cartID);
    if (!cart) {
        return res.status(400).send({ error: 'Producto no encontrado'});
    }
    res.send({status: 'success', cart});
});

router.post('/', async (req, res) => {
    const cart = {products: []};
    const result = await cartManager.addCarts(cart);
    res.send({ status: 'success', result });
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cartID = Number(req.params.cid);
    const productID = Number(req.params.pid);
    const product = await productManager.getProductById(productID);
    if (!product) {
        return res.status(400).send({ error: 'Producto no encontrado'});
    }
    const cart = await cartManager.getCartById(cartID)
    if (!cart) {
        return res.status(400).send({ error: 'Carrito no encontrado'});
    }
    const result = await cartManager.addProductToCart(cartID,productID) 
    res.send({ status: 'success', result });
});

export default router;