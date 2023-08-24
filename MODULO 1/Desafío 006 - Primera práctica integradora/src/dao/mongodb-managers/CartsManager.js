import cartsModel from "../models/carts.model.js";

class CartsManager {
  // Get
  getCarts = async () => {
    try{
      const carts = await cartsModel.find().lean().exec();
      return carts;
    } catch (error){
      console.error(`Error trying to bring carts: ${error}`);
    };
  };

  // Get by id
  getCartById = async (id) => {
    try {
      const cart = await cartsModel.findById(id).lean().exec();
      return cart;
    } catch (error){
      console.error(`Error trying to bring cart by id: ${error}`);
    };
  };

  // Create cart
  addCart = async (cart) => {
    const idProduct = cart.product.trim();
    const quantityProduct = Number(cart.quantity);
    
    if(quantityProduct < 1 || idProduct.length < 1) return;
    
    const formattedCart = {
      products: [{ product: idProduct, quantity: quantityProduct }]
    };

    try {
      const newCart = new cartsModel(formattedCart);
      await newCart.save();
      return newCart;
    } catch (error) {
      console.error(`Error trying to create the cart: ${error}`);
    };
  };

  // Add product to cart
  addProduct = async (cid, pid) => {
    const newProduct = { product: pid, quantity: 1 };
    try {
      const cart = await cartsModel.findById(cid);
      const indexProduct = cart.products.findIndex((item) => item.product == pid);

      if (indexProduct < 0) {
        cart.products.push(newProduct);
      } else {
        cart.products[indexProduct].quantity += 1;
      };

      await cart.save();
      return cart;
    } catch (error){
      console.error(`Error trying to add product to the cart: ${error}`);
    };
  };
};

const cartsManager = new CartsManager();

export default cartsManager;