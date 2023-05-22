import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import __dirname from './utils.js';
import productsRouter from './routes/api/products.router.js';
import cartsRouter from './routes/api/carts.router.js';
import viewsRouter from './routes/web/view.router.js';
import Product from "./dao/dbManager/products.js";
import Message from "./dao/dbManager/messages.js";

const productManager = new Product();
const messageManager = new Message();

const app = express();
app.use(express.static(`${__dirname}/public`));

//Parametros de config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuracion handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(`/`,viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

try {
    await mongoose.connect('mongodb+srv://orquera10:xxZGmwIcMyu8IiD6@clustercoderbackend.bqnpenw.mongodb.net/ecommerce?retryWrites=true&w=majority');
    console.log('DB CONNECTED')
} catch (error) {
    console.log(error);
}

const server = app.listen(8081, () => console.log('Server running on port 8081'));

const io = new Server(server);
app.set('socketio', io);

const productos = await productManager.getProducts();

io.on('connection', socket =>{
    console.log('cliente conectado');
    socket.emit("showProducts", productos);
})




const messages = await messageManager.getMessages();


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

