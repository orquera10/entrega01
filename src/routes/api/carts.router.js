// import { Router } from 'express';
import Router from '../router.js';
import Carts from '../../dao/dbManager/carts.manager.js';
import Products from '../../dao/dbManager/products.manager.js';
import { passportStrategiesEnum } from '../../config/enums.js';


const cartManager = new Carts();
const productManager = new Products();
// const router = Router();

export default class CartsRouter extends Router {
    init() {
        this.get('/:cid', ['ADMIN'], passportStrategiesEnum.JWT, this.getCart);
        this.post('/', ['ADMIN'], passportStrategiesEnum.JWT, this.save);
        this.post('/:cid/product/:pid', ['ADMIN'], passportStrategiesEnum.JWT, this.addProductCart);
        this.delete('/:cid/product/:pid', ['ADMIN'], passportStrategiesEnum.JWT, this.deleteProductCart);
        this.delete('/:cid', ['ADMIN'], passportStrategiesEnum.JWT, this.deleteCart);
        this.put('/:cid', ['ADMIN'], passportStrategiesEnum.JWT, this.updateCart);
        this.put('/:cid/product/:pid', ['ADMIN'], passportStrategiesEnum.JWT, this.updateQuantityCart);
    }

    async getCart(req, res) {
        try {
            const cartID = req.params.cid;
            const cart = await cartManager.getCartById(cartID);
            if (!cart) {
                return res.status(400).send({ error: 'Carrito no encontrado' });
            }
            res.sendSuccess(cart);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async save(req, res) {

        try {
            const cart = { products: [] };
            const result = await cartManager.addCarts(cart);

            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async addProductCart(req, res) {

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

            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async deleteProductCart(req, res) {

        try {
            const cartID = req.params.cid;
            const productID = req.params.pid;

            const cart = await cartManager.getCartById(cartID)

            if (!cart) {
                return res.status(400).send({ error: 'Carrito no encontrado' });
            }
            const result = await cartManager.deleteProductToCart(cartID, productID)
            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async deleteCart(req, res) {

        try {
            const cartID = req.params.cid;
            const cart = await cartManager.getCartById(cartID)
            if (!cart) {
                return res.status(400).send({ error: 'Carrito no encontrado' });
            }
            const result = await cartManager.deleteCart(cartID)
            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async updateCart(req, res) {

        try {
            const cartID = req.params.cid;
            const productos = req.body;

            const cart = await cartManager.getCartById(cartID)
            if (!cart) {
                return res.status(400).send({ error: 'Carrito no encontrado' });
            }
            const result = await cartManager.updateCart(cartID, productos);
            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async updateQuantityCart(req, res) {

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

            const result = await cartManager.updateQuantityCart(cartID, productID, quantity);
            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

}