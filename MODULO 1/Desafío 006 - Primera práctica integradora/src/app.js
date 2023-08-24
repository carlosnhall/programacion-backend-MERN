// Dependencies
import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
// Routes
import viewsRouter from './routes/views.router.js';
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

// Mongoose 
mongoose.set("strictQuery", false);
try {
    // Try connection
    await mongoose.connect("mongodb+srv://sebastianboari:k14t34AswjuUtUso@lsb-db.qyoux2f.mongodb.net/ecommerce");
    // DB up notif
    console.log(`Database connection successful: Host - ${mongoose.connection.host}, Database - ${mongoose.connection.name}`);
    // Http server up
    const httpServer = app.listen(port, () => {console.log(`Server Up on port ${port}`);});
    // Socket server up
    const socketServer = new Server(httpServer);
 
    // Middlewares
    // Views
    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartsRouter); 
    app.use("/products", viewsRouter);
    app.use('/realTimeProducts', realTimeProductsRouter(socketServer));
    app.use("/chat", chatRouter(socketServer));
} catch (error) {
    // Error message
    console.error(`Database connection failed: ${error}`);
};