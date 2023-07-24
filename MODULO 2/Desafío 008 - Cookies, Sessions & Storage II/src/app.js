// IMPORTS:
// Dependencies
import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import productManager from './dao/mongodb-managers/ProductManager.js';
import cookieParser from 'cookie-parser'; 
import session from 'express-session';
import MongoStore from 'connect-mongo';
// Routes
import viewsProductsRouter from './routes/views.products.router.js';
import viewsCartsRouter from './routes/views.cart.router.js'
import productsRouter from './routes/products.router.js';
import realTimeProductsRouter from './routes/realTimeProducts.router.js';
import chatRouter from './routes/chat.router.js';
import cartsRouter from './routes/carts.router.js';
import sessionsRouter from './routes/sessions.router.js';
import viewsSessionsRouter from './routes/views.sessions.router.js';

// CONFIG:
// Express & Server:
const app = express();
const port = 8080; 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));
// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');
// Cookies & Session
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

// Init function
const server = async () =>{
    try{
        // DB Connection
        await productManager.connect();
        // Http server up
        const httpServer = app.listen(port, () => {console.log(`Server Up on port ${port}`);});
        // Socket server up
        const socketServer = new Server(httpServer);
        
        // Middlewares
        // Views
        app.use("/sessions", viewsSessionsRouter);
        app.use("/products", viewsProductsRouter);
        app.use("/carts", viewsCartsRouter);
        app.use('/realTimeProducts', realTimeProductsRouter(socketServer));
        app.use("/chat", chatRouter(socketServer));

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