// Dependencies
import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser'; 
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from './passport.config.js';

// Utils
import __dirname from './utils.js';

// Managers
import productManager from './dao/manager/ProductManager.js';

// Views routes
import viewsProductsRouter from './routes/views/products.views.router.js';
import viewsCartsRouter from './routes/views/cart.views.router.js';
import viewsSessionsRouter from './routes/views/sessions.views.router.js';
import realTimeProductsRouter from './routes/views/realTimeProducts.router.js';
import viewsChatRouter from './routes/views/chat.views.router.js';
import viewsHomeRouter from './routes/views/home.views.router.js';

// API routes
import productsRouter from './routes/api/products.router.js';
import cartsRouter from './routes/api/carts.router.js';
import sessionsRouter from './routes/api/sessions.router.js';

// Express config:
const port = 8080; 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

// Handlebars config
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

// Cookies & Session config
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://sebastianboari:k14t34AswjuUtUso@lsb-db.qyoux2f.mongodb.net/',
        dbName: 'ecommerce',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    }),
    secret: "mysecretecommerce",
    resave: false,
    saveUninitialized: false
}));

// Passport config
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Init function
const server = async () =>{
    try{
        // DB Connection
        await productManager.connect();
        // Http server up
        const httpServer = app.listen(port, () => {console.log(`Server Up on port ${port}`);});
        // Socket server up
        const socketServer = new Server(httpServer);
        
        // Views
        app.use("/home", viewsHomeRouter);
        app.use("/sessions", viewsSessionsRouter);
        app.use("/products", viewsProductsRouter);
        app.use("/carts", viewsCartsRouter);
        app.use('/realTimeProducts', realTimeProductsRouter(socketServer));
        app.use("/chat", viewsChatRouter(socketServer));
        // api
        app.use('/api/sessions', sessionsRouter);
        app.use("/api/products", productsRouter);
        app.use("/api/carts", cartsRouter); 
    } catch(error) {
        console.error(`Error has been ocurred: ${error}`);
    };
};

// Init:
server();