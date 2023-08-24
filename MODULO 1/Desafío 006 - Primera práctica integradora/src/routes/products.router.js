import { Router } from 'express';
const router = Router();
import productManager from '../dao/mongodb-managers/ProductManager.js';

// Get
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(`Error trying to fetch all the products: ${error}`);
  };
});

// Get by ID
router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    const product = await productManager.getProductById(pid);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(`Error trying to fetch product by id: ${error}`);
  };
});

// Create
router.post("/", async (req, res) => {
  if(!req.body) return;

  try {
    const currentProduct = await productManager.addProduct(req.body);
    res.status(201).send({currentProduct});
  } catch (error) {
    res.status(500).send(`Error trying to create a product: ${error}`);
  };

});

// Update 
router.put("/:pid", async (req, res) => {
  if(!req.body) return;

  const pid = req.params.pid;

  try {
    const currentProduct = await productManager.updateProduct(pid, req.body);
    res.status(201).send({currentProduct});
  } catch (error) {
    res.status(500).send(`Error trying to create a product: ${error}`);
  };
});

// Delete
router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;

  try {
    const deteledProduct = await productManager.deleteProduct(pid);
    res.status(200).send(deteledProduct);
  } catch (error) {
    res.status(500).send(`Error trying to create a product: ${error}`);
  };
});


export default router;