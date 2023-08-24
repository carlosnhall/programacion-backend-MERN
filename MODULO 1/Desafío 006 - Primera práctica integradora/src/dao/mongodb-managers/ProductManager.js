import productModel from '../models/products.model.js';

class ProductManager {
  // Read
  getProducts = async () => {
    try {
      const products = await productModel.find().lean().exec();
      return products;
    } catch (error) {
      console.error(`Error trying to fetch all products: ${error}`);
    };
  };

  getProductById = async (id) => {
    try {
      const product = await productModel.findById(id).exec();
      return product;
    } catch (error) {
      console.error(`Error trying to fetch product by id: ${error}`);
    };
  };

  // Create
  addProduct = async (product) => {

    const title = product.title.trim();
    const description = product.description.trim();
    const code = product.code.trim();
    const price = Number(product.price);
    const category = product.category.trim();
    const status = product.status ?? true;
    const stock = Number(product.stock);
    const thumbnail = product.thumbnail.trim();

    const formattedProduct = {
      title: title,
      description: description,
      code: code,
      price: price,
      category: category,
      status: status,
      stock: stock,
      thumbnail: thumbnail
    };

    try{
      const newProduct = new productModel(formattedProduct);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      console.error(`Error trying to create a new product: ${error}`);
    };
  };

  // Update
  updateProduct = async (id, data) => {
    // Format values
    const fieldsToUpdate = Object.keys(data);
    const formattedValues = {};

    fieldsToUpdate.forEach((field) => {
      let formattedValue = data[field];

      if (field === 'precio' || field === 'stock') {
        formattedValue = Number(formattedValue);
      } else if (field === 'status'){
        formattedValue = Boolean(formattedValue);
      } else {
        formattedValue = formattedValue.trim();
      };

      // Eliminar valores vacíos ("")
      if (formattedValue !== "") {
        formattedValues[field] = formattedValue;
      }
    });

    if (Object.keys(formattedValues).length === 0) return;
    
    // Try to update
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(id, formattedValues, { new: true }).exec();
      return updatedProduct;
    } catch (error) {
      console.error(`Error trying to update product: ${error}`);
    };
  };

  // Delete
  deleteProduct = async (id) => {
    try {
      const deletedProduct = await productModel.findByIdAndDelete(id).exec();
      return `Product deleted successfully: ${deletedProduct}`;
    } catch (error) {
      console.error(`Error trying to delete product: ${error}`);
    };
  };
}

const productManager = new ProductManager();

export default productManager;