import { Router } from "express";
const router = Router();
import cartsManager from '../dao/mongodb-managers/CartsManager.js';

// Get carts
router.get('/', async (req, res) => {
  try{
    const carts = await cartsManager.getCarts();
    res.status(200).json({ carts });
  }catch(error){
    console.error(`Error trying to get carts: ${error}`);
    res.status(500).send(`Internal server error trying to get carts: ${error}`);
  };
});

// Get cart by ID
router.get('/:cid', async (req, res) => {
  try{
    const cid = req.params.cid;
    const cart = await cartsManager.getCartById(cid);
    res.status(200).json({ cart });
  }catch(error){
    console.error(`Error trying to get cart by id: ${error}`);
    res.status(500).send(`Internal server error trying to get cart by id: ${error}`);
  };
});

// Create cart
router.post('/', async (req, res) => {
  try{
    const products = req.body;
    const newCart = await cartsManager.addCart(products);
    res.status(200).json({ newCart });
  }catch(error){
    console.error(`Error trying create cart: ${error}`);
    res.status(500).send(`Internal server error trying create cart: ${error}`);
  };
});

// Add product to cart
router.post('/:cid/product/:pid', async (req, res) => {
  try{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const currentCart = await cartsManager.addProduct(cid, pid);
    res.status(202).json(currentCart);
  }catch(error){
    console.error(`Error trying to add a product to cart: ${error}`);
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`);
  };
});

export default router;