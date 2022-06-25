import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUser } from '../types/userTypes'
import { logger } from '../helpers/log4js'

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
  logger.info(password)
  return bcrypt.hashSync(password, 10)
}

export const UserModel = mongoose.model<IUser>(userCollection, UserSchema)
