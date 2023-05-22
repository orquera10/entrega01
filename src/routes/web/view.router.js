import { Router } from "express";
// import Products from "../../dao/dbManager/products.js";
import { productModel } from "../../dao/models/products.js"; 
import { cartModel } from "../../dao/models/carts.js";

const router = Router();

router.get('/products', async (req, res) => {
    const { page = 1, limit = 10, category = "", status = "",  sort = "" } = req.query;
    const filter = {};
    if (category) {
        filter.category = category; // Agregar filtro por categoría si se especifica
    }
    if (status) {
        filter.status = status; // Agregar filtro por categoría si se especifica
    }
        
    const sortBy = {};
    if (sort) {
        sortBy.price = sort
    } 
        
    const products = await productModel.paginate(filter, { limit, page, lean: true, sort:sortBy });
    const result = {
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage ? `/products?page=${products.prevPage}&limit=${limit}&category=${category}&status=${status}&sort=${sort}` : null,
        nextLink: products.hasNextPage ? `/products?page=${products.nextPage}&limit=${limit}&category=${category}&status=${status}&sort=${sort}` : null
    }
    res.render('home', result);
});

router.get('/carts/:cid', async (req, res) => {
    try {
        const cartID = req.params.cid;

        const carrito = await cartModel.find({ _id: cartID }).populate('products.product');
        const result = JSON.stringify(carrito)
        console.log(JSON.stringify(carrito, null, '\t'));

        res.render('cart', result)
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }

});

router.get(`/realTimeProducts`, async (req,res) => {
    try {
        res.render(`realTimeProducts`);
    } catch (error) {
        console.log(error);
    }
});

router.get('/chat', (req, res) => {    
    res.render('chat');
});

export default router;



