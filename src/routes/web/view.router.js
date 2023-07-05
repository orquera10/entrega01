import Router from '../router.js';
import { passportStrategiesEnum } from '../../config/enums.js';
import { getProductsPaginateService } from "../../service/products.service.js";


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
                
            const result = await getProductsPaginateService(filter, limit, page, sortBy, category, status, sort) 
            
            res.render('home', {products:result, user:req.user});
        });
        this.get('/', ['PUBLIC'], passportStrategiesEnum.NOTHING, (req, res) => {
            res.redirect('/login');
        });
        
    }

}



