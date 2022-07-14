import { encryptPassword } from '../helpers/encryptPassword'
import { logger } from '../helpers/log4js'
import { sendMail } from '../helpers/nodemailer'
import { sendSms, sendWpp } from '../helpers/twillio'
import { OrderModel } from '../Models/OrderModel'
import { ProductModel } from '../Models/ProductModel'
import { UserModel } from '../Models/User.model'

export default class UserPersistence {
  async checkIfEmailExist (email: string): Promise<boolean> {
    const result = await UserModel.findOne({ email })

    if (result) {
      return true
    } else {
      return false
    }
  }

  async findUserById (userId:any) {
    try {
      const user:any = await UserModel.findById(userId)
      if (user) {
        return {
          error: false,
          data: user
        }
      } else {
        return {
          error: true,
          data: { message: 'No se encontro el usuario' }
        }
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error interno' }
      }
    }
  }

  async createUser (userData: any): Promise<any> {
    try {
      userData.password = await encryptPassword(userData.password)

      try {
        const user = new UserModel(userData)
        const result = await user.save()
        return {
          error: false,
          data: result
        }
      } catch (error) {
        logger.error(error)
        return {
          error: true,
          data: { message: 'Ocurrio un error guardando al usuario' }
        }
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error creando al usuario' }
      }
    }
  }

  async findProductsCart (cart:any) {
    try {
      const prods = await ProductModel.find({
        _id: {
          $in: cart.map((item: { productId: any }) => item.productId)
        }
      })
      return { error: false, data: prods }
    } catch (error) {
      return {
        error: true,
        data: { message: 'Ocurrio un error creando al usuario' }
      }
    }
  }

  async saveNewOrder (order:any) {
    const newOrder = new OrderModel(order)

    newOrder.save(function (err: any, result: { _id: any }) {
      if (err) {
        logger.error(err)
        return ({
          error: true,
          data: { message: 'Ocurrio un error creando el pedido' }
        })
      } else {
        logger.warn(result)
        sendMail({
          to: 'tango45245362@gmail.com',
          subject: 'Nuevo pedido en la app',

          text: `Hola!! Con este correo se notifica que: ${order.user.name}, ha realizado un nuevo pedido. 🥳️.
          Esta es la información del pedido: 
          ${JSON.stringify(order, null, 2)}
          
          `
        })

        sendSms(`Hola ${order.user.name}! Tu pedido está en camino!! Puedes ver el estado del pedido con este código: ${result._id}`, order.user.phone, order.user.email)
        sendWpp(`Hola!! Con este mensaje se notifica que: ${order.user.name}, ha realizado un nuevo pedido. 🥳️.
        Esta es la información del pedido: 
        ${JSON.stringify(order, null, 2)}
        
        `)
        logger.info('Order created')

        return {
          error: false,

          data: {
            id: result._id

          }
        }
      }
    })
  }
}
