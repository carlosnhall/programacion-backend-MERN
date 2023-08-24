import express from 'express';
import { productManager } from './ProductManager.js';

const app = express();

app.listen(8080, () => {
    console.log('Server Up on port 8080');
});


// Devolver todos los productos o con un limite
// Ruta de prueba: http://localhost:8080/products?limit=1
app.get('/products', (req, res) => {
    const limit = Number(req.query.limit);
    limit? res.send(productManager.getProducts().slice(0, limit)) : res.send(productManager.getProducts()); 
});

// Devolver un producto por su id
// Ruta de prueba: http://localhost:8080/products/6
app.get('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    res.send(productManager.getProductById(id));
});