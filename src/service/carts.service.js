import CartsRepository from '../repositories/carts.repository.js';
import ProductsRepository from '../repositories/products.repository.js';
import TicketsRepository from '../repositories/tickets.repository.js';

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

    console.log(productsConStock.length);
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
    const produ = {products: productsSinStock};
    await cartsRepository.updateCart(cart._id, produ);

    const result = await ticketsRepository.createTicket(ticket);
    return ({ticket: result , productOut: productsSinStock});
}


export{
    addCartService,
    getCartByIdService,
    addProductToCartService,
    deleteProductToCartService,
    deleteCartService,
    updateCartService,
    updateQuantityCartService,
    purchaseCartService
}


        