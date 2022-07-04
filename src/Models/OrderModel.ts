
import mongoose from 'mongoose'

const ordersCollection = 'orders'

const OrderSchema = new mongoose.Schema({
  id: { type: String },

  createdAt: { type: Date, default: Date.now },
  user: {
    id: { type: String },
    name: { type: String },
    email: { type: String },
    address: { type: String },
    phone: { type: String }
  },
  products: [
    {
      id: { type: String },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number }
    }
  ],
  totalItems: { type: Number },
  totalPrice: { type: Number },
  status: { type: String }

})

export const OrderModel = mongoose.model(ordersCollection, OrderSchema)
