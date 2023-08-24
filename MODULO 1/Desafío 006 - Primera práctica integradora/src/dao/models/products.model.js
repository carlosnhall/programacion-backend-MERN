import mongoose from "mongoose";
const productCollection = "products";

const productSchema = new mongoose.Schema({
  title:{ 
    type: String, 
    required: true 
  },
  description:{ 
    type: String, 
    required: true
  },
  code:{
    type: String,
    required: true,
    unique: true
  },
  price:{ 
    type: Number,
    required: true 
  },
  status: Boolean,
  stock:{
    type: Number, 
    required: true
  },
  category:{
    type: String,
    required: true
  },
  thumbnail: String,
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;



/*
{
  "title": "Un titulo hermoso",
  "description": "Una descripcion muy descriptiva",
  "code": "ProdDePrueba123",
  "price": 255,
  "category": "category",
  "status": true,
  "stock": 25,
  "thumbnail": "soylindo.jpg"
}
*/