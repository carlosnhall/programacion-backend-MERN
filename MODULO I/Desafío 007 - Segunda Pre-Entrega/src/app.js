// Dependencies
import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import productManager from './dao/mongodb-managers/ProductManager.js';
// Routes
import viewsRouter from './routes/views.router.js';
import viewsCartsRouter from './routes/views.cart.router.js'
import productsRouter from './routes/products.router.js';
import realTimeProductsRouter from './routes/realTimeProducts.router.js';
import chatRouter from './routes/chat.router.js';
import cartsRouter from './routes/carts.router.js';
// Config
const app = express();
const port = 8080; 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));
// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

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
        app.use("/products", viewsRouter);
        app.use("/carts", viewsCartsRouter);
        app.use('/realTimeProducts', realTimeProductsRouter(socketServer));
        app.use("/chat", chatRouter(socketServer));

        // api
        app.use("/api/products", productsRouter);
        app.use("/api/carts", cartsRouter); 

    } catch(error) {
        console.error(`Error has been ocurred: ${error}`);
    };
};

server();