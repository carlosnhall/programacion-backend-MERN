import { Router } from 'express';
const router = Router();
import productManager from '../dao/mongodb-managers/ProductManager.js';

// Get
router.get('/', async (req, res) => {
    
    try {
        const products = await productManager.getProducts();
  
        res.status(200).render('products', {
            style: 'index',
            title: 'Productos',
            products: products
        });
  
    } catch (error) {
        res.status(500).send(`Error trying to fetch all the products: ${error}`);
    };
  
});

// Get by ID
router.get('/:pid', async (req, res) => {
    const pid = req.params.pid;

    try {
        const product = await productManager.getProductById(pid);
  
        res.status(200).render('product', {
            style: 'index',
            title: `${product.title}`,
            product: product.toObject()
        });
    } catch (error) {
        res.status(500).send(`Error trying to fetch product by id: ${error}`);
    };
});


export default router;