import { Router } from 'express';
const router = Router();

import cartsManager from '../dao/mongodb-managers/CartsManager.js';

const auth = (req, res, next) => {
    if(req.session.admin){
        return next();
    }else if(!req.session.admin){
        res.redirect('/sessions/login');
    };
};

// Cart view
router.get('/:cid', auth,  async (req, res) => {
    const cartId = req.params.cid;

    try{
        const cart = await cartsManager.getCartById(cartId);
        
        res.status(200).render('cart', {
            script: "cart",
            style: "cart",
            title: "Carrito",
            cart: cart
        });
    }catch(error){
        res.status(500).send(`Error trying to fetch cart data: ${error}`);
    };
});


export default router;