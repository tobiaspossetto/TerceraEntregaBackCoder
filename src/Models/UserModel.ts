import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import { IUser } from '../types/userTypes'

const userCollection = 'users'

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }

})

UserSchema.methods.encryptPassword = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const UserModel = mongoose.model<IUser>(userCollection, UserSchema)
