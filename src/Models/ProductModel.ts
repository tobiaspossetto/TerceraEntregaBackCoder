
import mongoose from 'mongoose'

const productsCollection = 'products'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  descripcion: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  stock: { type: Number, required: true },
  category: { type: String, required: true }

})

export const ProductModel = mongoose.model(productsCollection, ProductSchema)
