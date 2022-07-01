import { logger } from '../helpers/log4js'
import { sendMail } from '../helpers/nodemailer'

import { UserModel } from '../Models/UserModel'
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
}
