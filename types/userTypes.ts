import { Document } from 'mongoose'

export interface IUser extends Document {
  _id?: string;
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
  avatar: string;
  createdAt?: Date;
  encryptPassword(password: string): string;
}
export interface IdataUserRegistration {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
  avatar: string;
  createdAt?: Date;
}
