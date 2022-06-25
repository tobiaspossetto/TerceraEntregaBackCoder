
import { logger } from '../helpers/log4js'
import { validPassword } from '../helpers/validPassword'
import { UserModel } from '../Models/UserModel'
import { IdataUserRegistration } from '../types/userTypes'

export default class UserService {
  async signIn () {
    return 1
  }

  async logOut () {

  }

  async signUp (userData:IdataUserRegistration) {
    // se crea al usuario

    const newUser = new UserModel()
    newUser.email = userData.email

    newUser.password = newUser.encryptPassword(userData.password)
    newUser.name = userData.name
    newUser.address = userData.address
    newUser.phone = userData.phone
    newUser.avatar = userData.avatar

    await newUser.save()
    logger.info('User created')
    return true
  }
}
