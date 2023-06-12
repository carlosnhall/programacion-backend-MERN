const express = require('express');
const { Server } = require('socket.io');
const viewsRouter = require('./routes/views.router');
const handlebars = require('express-handlebars');
const productManager = require('./classes/ProductManager');

const app = express();
const port = 8080; 

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

// Views Handler
app.use('/', viewsRouter);

const httpServer = app.listen(port, () => {
    console.log(`Server Up on port ${port}`);
});

const socketServer = new Server(httpServer);

const products = productManager.getProducts();

socketServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado...');
    socketServer.emit('products', products);

    socket.on('newProduct', (product) => {
        productManager.addProduct(product.title, product.description, product.thumbnail, product.stock, product.price);
        socketServer.emit('products', products);
    });

    socket.on('deleteProduct', (product) => {
        const productToDelete = Number(product);
        
        productManager.deleteProduct(productToDelete);

        socketServer.emit('products', products);
    });
});