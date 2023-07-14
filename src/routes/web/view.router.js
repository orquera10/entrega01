import Router from '../router.js';
import { passportStrategiesEnum } from '../../config/enums.js';
import { getProductsPaginateService } from "../../service/products.service.js";
import MessagesRepository from '../../repositories/messages.repository.js';

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

        //Vista chat
        this.get('/chat', ['USER'], passportStrategiesEnum.JWT, async (req, res) => {

            userChat = `${req.user.first_name} ${req.user.last_name}`
            const io = req.app.get('socketio');
            //Implementacion para guardar mensages del chat en base de datos
            const messages = await MessagesRepository.getMessages();
            // console.log(messages);
            // console.log(messages[8].user);
            // const messagesName = messages.map(item=>{
            //     return {user:item.user.first_name, message: item.message};
            // })
            // console.log(messages);
            
            io.on('connection', socket => {
                console.log('conectado a chat');

                // socket.broadcast.emit('newUserConnected', userChat);

                socket.on('message', async data => {

                    const result = { user: userChat, ...data };
                    // console.log(result.userId.first_name);
                    await MESSAGEDAO.addMessages(result);
                    messages.push(result);
                    io.emit('messageLogs', messages);
                    await MessagesRepository.addMessages(result);

                });

                // socket.on('authenticated', data => {

                //     socket.broadcast.emit('newUserConnected', data);
                // });
            })
            res.render('chat');
        });
    }

}




