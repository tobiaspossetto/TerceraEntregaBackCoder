import { logger } from '../helpers/log4js'
import UserService from '../services/UserService'
import { Iorder } from '../types/producTypes'
import { IdataUserRegistration } from '../types/userTypes'
const userService = new UserService()
export default class UserController {
  async signIn () {

  }

  async logOut () {

  }

  async signUp (userData:IdataUserRegistration) {
    try {
      const res = await userService.signUp(userData)
      if (res.code === 1) {
        return {
          error: false,
          code: 1,
          data: { ...res.data }
        }
      } else if (res.code === 2) {
        return {
          error: true,
          code: 2,
          data: { ...res.data }
        }
      } else if (res.code === 3) {
        return {
          error: true,
          code: 2,
          data: { ...res.data }
        }
      } else {
        return {
          error: true,
          code: 4,
          data: { message: 'Ocurrio un error interno' }
        }
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        code: 4,
        data: { message: 'Ocurrio un error interno' }
      }
    }
  }

  async createOrder (userId:string, cart:Iorder) {
    try {
      // @ts-ignore
      const result = await userService.createOrder(userId, cart)
      return result
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        code: 4,
        data: { message: 'Ocurrio un error interno' }
      }
    }
  }
}
