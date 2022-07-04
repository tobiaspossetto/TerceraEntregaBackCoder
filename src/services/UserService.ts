import { logger } from '../helpers/log4js'
import { sendMail } from '../helpers/nodemailer'
import { OrderModel } from '../Models/OrderModel'
import { ProductModel } from '../Models/ProductModel'

import { UserModel } from '../Models/UserModel'
import { Iorder } from '../types/producTypes'
import { IdataUserRegistration } from '../types/userTypes'

export default class UserService {
  async signIn () {
    return 1
  }

  async logOut () {}

  async signUp (userData: IdataUserRegistration) {
    /*
      Manejo de errores:

      # code 2 = email ya usado
      # code 3 = ocurrio un error interno al crear al usuario
      # en caso de exito emailNotification indica si se pudo enviar la notification por correo o ocurrio un fallo al enviarla
    */
    // se crea al usuario
    const exist = await UserModel.findOne({ email: userData.email })
    if (exist) {
      logger.info('El usuario ya existe')
      return {
        error: true,
        code: 2,
        data: {
          message: 'El email ya es utilizado',
          emailNotification: false
        }

      }
    }

    try {
      const newUser = new UserModel()
      newUser.email = userData.email

      newUser.password = newUser.encryptPassword(userData.password)
      newUser.name = userData.name
      newUser.address = userData.address
      newUser.phone = userData.phone
      newUser.avatar = userData.avatar

      await newUser.save()
      logger.info('User created')

      const emailStatus = await sendMail({
        to: 'tango45245362@gmail.com',
        subject: 'Nuevo registro en la app',
        text: `Hola!! Con este correo se notifica que: ${newUser.name}, ha sido registrado con exito. 🥳️
          DATOS DEL NUEVO USUARIO:
          Nombre: ${newUser.name}
          Direccion: ${newUser.address}
          Telefono: ${newUser.phone}

        `
      })
      if (emailStatus) {
        return {
          error: false,
          code: 1,
          data: {
            message: 'Usuario registrado con exito',
            emailNotification: true
          }
        }
      } else {
        return {
          error: false,
          code: 1,
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
        code: 3,
        data: {
          message: 'Fallo interno al registrar usuario',
          emailNotification: false
        }
      }
    }
  }

  async createOrder (userId:string, cart:{productId:string, quantity:number}[]) {
    try {
      logger.info(userId)
      logger.info(cart)
      const user = await UserModel.findById(userId)
      const prods = await ProductModel.find({
        _id: {
          $in: cart.map(item => item.productId)
        }
      })
      logger.info(prods)
      const finalProducts = prods.map(item => {
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

          _id: user?._id,
          name: user?.name,
          email: user?.email,
          address: user?.address,
          phone: user?.phone
        },
        products: finalProducts,
        totalPrice: prods.reduce((acc, cur) => acc + cur.price, 0),
        totalItems: cart.reduce((acc, cur) => acc + cur.quantity, 0)

      }
      const newOrder = new OrderModel(order)
      logger.info(newOrder)
      await newOrder.save()
      logger.info('Order created')
      await sendMail({
        to: 'tango45245362@gmail.com',
        subject: 'Nuevo pedido en la app',
        // @ts-ignore
        text: `Hola!! Con este correo se notifica que: ${user.name}, ha realizado un nuevo pedido. 🥳️.
        Esta es la información del pedido: 
        ${JSON.stringify(order, null, 2)}
        
        `
      })

      return {
        error: false,
        code: 1,
        data: {
          message: 'Orden creada con exito'

        }
      }
    } catch (error) {
      logger.error(error)
      return ({
        error: true,
        data: { message: 'Ocurrio un error interno' }
      })
    }
  }
}
