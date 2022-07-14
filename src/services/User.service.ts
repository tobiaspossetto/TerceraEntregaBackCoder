import { logger } from '../helpers/log4js'
import { sendMail } from '../helpers/nodemailer'
import { sendSms, sendWpp } from '../helpers/twillio'
import { OrderModel } from '../Models/OrderModel'
import { ProductModel } from '../Models/ProductModel'

import { UserModel } from '../Models/User.model'

import { IdataUserRegistration } from '../../types/userTypes'
import UserPersistence from '../persistence/User.persistence'
const persistence = new UserPersistence()
export default class UserService {
  async signIn () {
    return 1
  }

  async logOut () {}

  async signUp (userData: IdataUserRegistration) {
    const exist = await persistence.checkIfEmailExist(userData.email)
    if (exist) {
      logger.info('El usuario ya existe')
      return {
        error: true,

        data: {
          message: 'El email ya es utilizado'
        }

      }
    }

    try {
      const saved = await persistence.createUser(userData)
      if (saved.error) {
        return {
          error: true,
          data: { message: saved.data.message }
        }
      }

      // * ENVIO DE CORREO DE NOTIFICACION
      const emailStatus = await sendMail({
        to: 'tango45245362@gmail.com',
        subject: 'Nuevo registro en la app',
        text: `Hola!! Con este correo se notifica que: ${saved.data.name}, ha sido registrado con exito. 🥳️
          DATOS DEL NUEVO USUARIO:
          Nombre: ${saved.data.name}
          Direccion: ${saved.data.address}
          Telefono: ${saved.data.phone}

        `
      })
      if (emailStatus) {
        return {
          error: false,

          data: {
            message: 'Usuario registrado con exito',
            emailNotification: true
          }
        }
      } else {
        return {
          error: false,

          data: {
            message: 'Usuario registrado con exito, fallo al mandar correo de notificacion',
            emailNotification: false
          }
        }
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,

        data: {
          message: 'Fallo interno al registrar usuario'

        }
      }
    }
  }

  async createOrder (userId:string, cart:{productId:string, quantity:number}[]) {
    try {
      const user = await persistence.findUserById(userId)
      if (user.error) {
        return user
      }
      const prods = await persistence.findProductsCart(cart)
      if (prods.error) {
        return prods
      }
      // @ts-ignore
      const finalProducts = prods.data.map(item => {
        return {
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: cart.find(i => i.productId === item._id.toString())?.quantity

        }
      }
      )

      const order = {
        user: {

          _id: user.data._id,
          name: user.data.name,
          email: user.data.email,
          address: user.data.address,
          phone: user.data.phone
        },
        products: finalProducts,
        totalPrice: finalProducts.reduce((acc:any, cur:any) => acc + cur.price * cur.quantity, 0),
        totalItems: cart.reduce((acc, cur) => acc + cur.quantity, 0)

      }
      const saved = await persistence.saveNewOrder(order)
      return saved
    } catch (error) {
      logger.error(error)
      return ({
        error: true,
        data: { message: 'Ocurrio un error interno' }
      })
    }
  }
}
