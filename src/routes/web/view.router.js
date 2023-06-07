import { Router } from "express";
import { productModel } from "../../dao/models/products.model.js"; 
// import { cartModel } from "../../dao/models/carts.model.js";
import Carts from "../../dao/dbManager/carts.manager.js"


const router = Router();

const cartManager = new Carts()

//Acceso público y privado
const publicAccess = (req, res, next) => {
    if(req.session.user) return res.redirect('/products');
    next();
}

const privateAccess = (req, res, next) => {
    if(!req.session.user) return res.redirect('/login');
    next();
}

//redireccionar raiz al login
router.get('/', publicAccess, (req, res) => {
    res.redirect('/login');
});

//Vista para mostrar los productos con paginacion
router.get('/products', privateAccess, async (req, res) => {
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
    
    res.render('home', {products:result, user:req.session.user});
});

//Vista para mostrar los productos de un carrito especificado
router.get('/carts/:cid', async (req, res) => {
    try {
        const cartID = req.params.cid;
        const result = await cartManager.getCartById(cartID)

        res.render('cart', result)
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

//Vista para ver productos en tiempo real
router.get(`/realTimeProducts`, async (req,res) => {
    try {
        res.render(`realTimeProducts`);
    } catch (error) {
        console.log(error);
    }
});

//Vista del chat
router.get('/chat', (req, res) => {    
    res.render('chat');
});

//Vistas para login
router.get('/register', publicAccess, (req, res) => {
    res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
    res.render('login');
});

export default router;



