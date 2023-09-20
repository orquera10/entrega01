import CartsRepository from '../repositories/carts.repository.js';
import ProductsRepository from '../repositories/products.repository.js';
import TicketsRepository from '../repositories/tickets.repository.js';
import { ProductNotFound } from "../utils/custom-exceptions.js";

const cartsRepository = new CartsRepository();
const productsRepository = new ProductsRepository();
const ticketsRepository = new TicketsRepository();

const getCartByIdService = async (cid) => {
    const result = await cartsRepository.getCartById(cid);
    return result;
}

const addCartService = async (cart) => {
    const result = await cartsRepository.addCarts(cart);
    return result;
}

const addProductToCartService = async (cid, pid) => {
    const cart = await cartsRepository.getCartById(cid);
    const existingProductIndex = cart.products.findIndex((item) => item.product._id.toString() === pid);

    if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += 1;
    } else {
        cart.products.push({ product: pid });
    }
    const result = await cartsRepository.updateCart(cid, cart);
    return result;
}

const deleteProductToCartService = async (cid, pid) => {
    const cart = await cartsRepository.getCartById(cid);

    const existingProductIndex = cart.products.findIndex((item) => item.product._id.toString() === pid);
    if (existingProductIndex !== -1) {
        cart.products.splice(existingProductIndex, 1);
    } else {
        throw new ProductNotFound('Product not found');
    }
    const result = await cartsRepository.updateCart(cid, cart);
    return result;
}

const deleteCartService = async (cid) => {
    const result = await cartsRepository.deleteCart(cid);
    return result;
}

const updateCartService = async (cid, products) => {
    const result = await cartsRepository.updateCart(cid, products);
    return result;
}

const updateQuantityCartService = async (cid, pid, quantity) => {
    const cart = await cartsRepository.getCartById(cid);
    const existingProductIndex = cart.products.findIndex((item) => item.product._id.toString() === pid);
    if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity = quantity.quantity;
    } else {
        throw new ProductNotFound('Product not found');
    }
    const result = await cartsRepository.updateCart(cid, cart);
    return result;
}

const purchaseCartService = async (user, cart) => {
    const productsCart = cart.products;
    const productsConStock = [];
    const productsSinStock = [];

    for (let productCart of productsCart) {
        const product = await productsRepository.getProductsById(productCart.product);

        if (productCart.quantity <= product.stock) {
            productsConStock.push(productCart);
            await productsRepository.updateProducts(product._id, { stock: product.stock - productCart.quantity });
        } else {
            productsSinStock.push(productCart);
        }
    }

    const sum = productsConStock.reduce((acc, producto) => {
        acc += producto.product.price;
        return acc;
    }, 0);

    if (productsConStock.length === 0) {
        throw { message: "No hay stock" };
    }

    const orderNumber = Date.now() + Math.floor(Math.random() * 100000 + 1);

    const ticket = {
        code: orderNumber,
        amount: sum,
        purchaser: user.email,
    };

    //actualizo el cart
    const produ = { products: productsSinStock };
    await cartsRepository.updateCart(cart._id, produ);

    const result = await ticketsRepository.createTicket(ticket);
    return ({ ticket: result, productOut: productsSinStock });
}


export {
    addCartService,
    getCartByIdService,
    addProductToCartService,
    deleteProductToCartService,
    deleteCartService,
    updateCartService,
    updateQuantityCartService,
    purchaseCartService
}


