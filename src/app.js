import express from 'express';
import handlebars from 'express-handlebars';
import {__directory} from './utils/utils.js';
import ProductsRouter from './routes/api/products.router.js';
import CartsRouter from './routes/api/carts.router.js';
import UsersRouter from './routes/api/users.router.js';
import ViewsRouter from './routes/web/view.router.js';
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import config from './config/config.js';
import cors from 'cors';
import {Server} from 'socket.io';
import errorHandler from './middleware/errors/index.js'
import { addLogger } from './middleware/logger/logger.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const cartsRouter = new CartsRouter();
const usersRouter = new UsersRouter();
const productsRouter = new ProductsRouter();
const viewsRouter = new ViewsRouter();

const app = express();
app.use(cors());
app.use(addLogger);

//Parametros de config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__directory}/public`));
app.use(cookieParser());

//Configuracion handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__directory}/views`);
app.set('view engine', 'handlebars');

//PASSPORT
initializePassport();
app.use(passport.initialize());

//documentacion
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de proyecto para E-commerce',
            description: 'API pensada para resolver el proceso de compra de productos'
        }
    },
    apis: [`${__directory}/docs/**/*.yaml`]
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(`/`,viewsRouter.getRouter());
app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartsRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());
app.use(errorHandler);

const port = Number(config.port);
const server = app.listen(port, () => console.log('Server running on port 8081'));

const io = new Server(server);
app.set('socketio', io);