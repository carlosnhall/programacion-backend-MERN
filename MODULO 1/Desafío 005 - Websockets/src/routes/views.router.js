const { Router } = require('express');
const router = Router();
const productManager = require('../classes/ProductManager');

// Productos estáticos:
router.get('/', async (req, res) => {
    try {
        res.status(200).render('home', {
            style: 'index',
            script: '',
            title: 'Productos',
            products: productManager.getProducts()
        });

    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    };
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        res.status(200).render('realTimeProducts', {
            style: 'index',
            script: 'index',
            title: 'Productos',
        });

    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    };
});


module.exports = router;