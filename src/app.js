import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import {__dirname} from './utils.js';
import ProductsRouter from './routes/api/products.router.js';
import CartsRouter from './routes/api/carts.router.js';
import UsersRouter from './routes/api/users.router.js';
import ViewsRouter from './routes/web/view.router.js';
// import viewsRouter from './routes/web/view.router.js';
// import sessionsRouter from './routes/api/sessions.router.js';
import Product from "./dao/dbManager/products.manager.js";
import Message from "./dao/dbManager/messages.manager.js";
import MongoStore from 'connect-mongo';
// import session from 'express-session';
import initializePassport from './config/passport.config.js';
import passport from 'passport';



const productManager = new Product();
const messageManager = new Message();

const cartsRouter = new CartsRouter();
const usersRouter = new UsersRouter();
const productsRouter = new ProductsRouter();
const viewsRouter = new ViewsRouter();

const app = express();

try {
    await mongoose.connect('mongodb+srv://orquera10:xxZGmwIcMyu8IiD6@clustercoderbackend.bqnpenw.mongodb.net/ecommerce?retryWrites=true&w=majority');
    console.log('DB CONNECTED')
} catch (error) {
    console.log(error);
}



//Parametros de config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

//Configuracion handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// //configurar session
// app.use(session({
//     store: MongoStore.create({
//         client: mongoose.connection.getClient(),
//         ttl: 3600
//     }),
//     secret: 'Coder39760',
//     resave: true,
//     saveUninitialized: true
// }))

//PASSPORT
initializePassport();
app.use(passport.initialize());
// app.use(passport.session());


app.use(`/`,viewsRouter.getRouter());
app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartsRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());
// app.use('/api/sessions', sessionsRouter);

const server = app.listen(8081, () => console.log('Server running on port 8081'));

const io = new Server(server);
app.set('socketio', io);

const productos = await productManager.getProducts();

const messages = await messageManager.getMessages();

//Mostrar productos apenas carga la vista '/realtimeProducts'
io.on('connection', socket =>{
    console.log('cliente conectado');
    socket.emit("showProducts", productos);
})

//Implementacion para guardar mensages del chat en base de datos
io.on('connection', socket => {
    
    socket.on('message', async data => {
        messages.push(data);
        io.emit('messageLogs', messages);
        await messageManager.addMessages(data);
        
    });

    socket.on('authenticated', data => {
        socket.emit('messageLogs', messages);
        socket.broadcast.emit('newUserConnected', data);
    });
    
})

