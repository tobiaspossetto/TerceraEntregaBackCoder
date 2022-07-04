
import mongoose from 'mongoose'

const productsCollection = 'products'

const ProductSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  stock: { type: Number, required: true },
  category: { type: String, required: true }

})

export const ProductModel = mongoose.model(productsCollection, ProductSchema)
