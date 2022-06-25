import { logger } from '../helpers/log4js'
import UserService from '../services/UserService'
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
      if (res) {
        return true
      } else {
        return false
      }
    } catch (error) {
      logger.error(error)
      return false
    }
  }
}
