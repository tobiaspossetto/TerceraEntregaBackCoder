import { logger } from '../helpers/log4js'
import passport from 'passport'

import { validPassword } from '../helpers/validPassword'
import { UserModel } from '../Models/UserModel'
import { Strategy as LocalStrategy } from 'passport-local'
import { NextFunction, Request, Response } from 'express'

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async function (req, email:string, password:string, done:any) {
    logger.info('ENTRAMOS A LA FUNCION DE PASSPORT')
    try {
      let user
      try {
        user = await UserModel.findOne({ email })
        logger.info('SE BUSCA USUARIO')
      } catch (error) {
        logger.info('ERROR BUSCANDO EN LA DB')
      }
      logger.info(user)
      if (!user) {
        logger.info('NO SE ENCONTRO USUARIO')
        // DONE: primer parametro va un error o null y segundo si la persona esta autenticada
        return done(null, false)
      }

      // * SI HAY USUARIO... VALIDAMOS PASSWORD
      logger.info(password)
      logger.info(user.password)
      const isValidPassword = await validPassword(password, user.password)
      logger.info('PASAMOS VALIDAMOS PASSWORD')
      if (!isValidPassword) {
        logger.info(`Invalid password for user ${email}`)
        return done(null, false)
      }
      // * SI LA CONTRASEÑA ES CORRECTA...
      const finalUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.name
      }
      logger.info('USUARIO ENCONTRADO')
      return done(null, finalUser)
    } catch (error) {
      logger.info('ERROR DIRECTO')
      logger.error(error)
      done(error)
    }
  }

))

passport.serializeUser((user:any, done:any) => {
  done(null, user.id)
})

passport.deserializeUser(async function (id, done:any) {
  try {
    const result = await UserModel.findById(id)
    // @ts-ignore
    done(null, { email: result.email, id: result._id, name: result.name })
  } catch (error) {
    logger.error(error)
    done(error)
  }
})

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    // @ts-ignore
    // console.log(req.user)
    return next()
  } else {
    res.send('NO AUTORIZADO')
  }
}
