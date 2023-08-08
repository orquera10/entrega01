import Router from '../router.js';
import { passportStrategiesEnum } from '../../config/enums.js';
import { getProductsPaginateService } from "../../service/products.service.js";
import MessagesRepository from '../../repositories/messages.repository.js';
import CartsRepository from '../../repositories/carts.repository.js';
import { generateProduct } from '../../utils/utils.js';

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

        this.get('/products', ['USER', 'ADMIN'], passportStrategiesEnum.JWT, async (req, res) => {

            const { page = 1, limit = 10, category = "", status = "", sort = "" } = req.query;
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

            res.render('home', { products: result, user: req.user });
        });
        this.get('/', ['PUBLIC'], passportStrategiesEnum.NOTHING, (req, res) => {
            res.redirect('/login');
        });

        //Vista chat
        this.get('/chat', ['USER'], passportStrategiesEnum.JWT, async (req, res) => {
            const messagesRepository = new MessagesRepository();
            let userChat = `${req.user.first_name} ${req.user.last_name}`
            const io = req.app.get('socketio');
            //Implementacion para guardar mensages del chat en base de datos
            const messages = await messagesRepository.getMessages();

            io.on('connection', socket => {
                console.log('conectado a chat');

                socket.on('message', async data => {
                    const result = { user: userChat, ...data };
                    await messagesRepository.addMessages(result);
                    messages.push(result);
                    io.emit('messageLogs', messages);
                });
            })
            res.render('chat');
        });


        // //Vista para mostrar los productos de un carrito especificado
        this.get('/cart', ['USER'], passportStrategiesEnum.JWT, async (req, res) => {
            try {
                const cartRepository = new CartsRepository();

                const carrito = req.user.cart;
                const result = await cartRepository.getCartById(carrito);

                res.render('cart', result)
            } catch (error) {
                res.status(500).send({ status: 'error', error });
            }
        });

        //ruta para mockear productos
        this.get('/mocking-products', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
            try {
                const products = [];
                for (let i = 0; i < 100; i++) {
                    products.push(generateProduct());
                }
                res.sendSuccess(products);

            } catch (error) {
                res.sendServerError(error.message);
            }
        });

        //ruta para probar logger
        this.get('/test-logger', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
            try {

                //custom levels
                console.log('--------------------');
                req.logger.fatal('Prueba fatal');
                req.logger.error('Prueba error');
                req.logger.warning('Prueba warning');
                req.logger.info('Prueba info');
                req.logger.http('Prueba http');
                req.logger.debug('Prueba debug');

                res.sendSuccess({ status: "sucess" });

            } catch (error) {
                res.sendServerError(error.message);
            }

        });

        //ruta para recuperar password
        this.get('/link-password', ['PUBLIC'], passportStrategiesEnum.NOTHING, (req, res) => {
            if (req.cookies["coderCookieToken"]) res.redirect('/products');
            res.render('recuperar-pass');
        });

        this.get('/reset-password', ['PUBLIC'], passportStrategiesEnum.NOTHING, (req, res) => {
            if (req.cookies["coderCookieToken"]) res.redirect('/products');
            const { token = "" } = req.query;
            res.render('reset-pass', {token});
        });
    }


}




