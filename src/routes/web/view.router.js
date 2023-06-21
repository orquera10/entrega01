// import { Router } from "express";
// import { productModel } from "../../dao/models/products.model.js"; 
// import Carts from "../../dao/dbManager/carts.manager.js"
import Products from "../../dao/dbManager/products.manager.js"
import Router from '../router.js';
import { passportStrategiesEnum } from '../../config/enums.js';

// const router = Router();

// const cartManager = new Carts()
const productManager = new Products()


export default class ViewsRouter extends Router {
    init() {
        this.get('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, (req, res) => {
            
            if (req.cookies["coderCookieToken"]) res.redirect('/products');
            
            res.render('login');
        
            
            
        });
        this.get('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, (req, res) => {
            if (req.cookies["coderCookieToken"]) res.redirect('/products');
            res.render('register');
        });
        this.get('/products', ['USER','ADMIN'], passportStrategiesEnum.JWT, async (req, res) => {
            
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
                
            const result = await productManager.getProductsPaginate(filter, limit, page, sortBy, category, status, sort) 
            
            res.render('home', {products:result, user:req.user});
        });
        this.get('/', ['PUBLIC'], passportStrategiesEnum.NOTHING, (req, res) => {
            res.redirect('/login');
        });
        
    }

}




// //Acceso público y privado
// const publicAccess = (req, res, next) => {
//     if(req.session.user) return res.redirect('/products');
//     next();
// }

// const privateAccess = (req, res, next) => {
//     if(!req.session.user) return res.redirect('/login');
//     next();
// }

// //redireccionar raiz al login
// router.get('/', publicAccess, (req, res) => {
//     res.redirect('/login');
// });

// //Vista para mostrar los productos con paginacion
// router.get('/products', privateAccess, async (req, res) => {
//     const { page = 1, limit = 10, category = "", status = "",  sort = "" } = req.query;
//     const filter = {};

//     if (category) {
//         filter.category = category; // Agregar filtro por categoría si se especifica
//     }
//     if (status) {
//         filter.status = status; // Agregar filtro por categoría si se especifica
//     }
        
//     const sortBy = {};
//     if (sort) {
//         sortBy.price = sort
//     } 
        
//     const result = await productManager.getProductsPaginate(filter, limit, page, sortBy) 
    
//     res.render('home', {products:result, user:req.session.user});
// });

// //Vista para mostrar los productos de un carrito especificado
// router.get('/carts/:cid', async (req, res) => {
//     try {
//         const cartID = req.params.cid;
//         const result = await cartManager.getCartById(cartID)

//         res.render('cart', result)
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// });

// //Vista para ver productos en tiempo real
// router.get(`/realTimeProducts`, async (req,res) => {
//     try {
//         res.render(`realTimeProducts`);
//     } catch (error) {
//         console.log(error);
//     }
// });

// //Vista del chat
// router.get('/chat', (req, res) => {    
//     res.render('chat');
// });

// //Vistas para login
// router.get('/register', publicAccess, (req, res) => {
//     res.render('register');
// });

// router.get('/login', publicAccess, (req, res) => {
//     res.render('login');
// });



