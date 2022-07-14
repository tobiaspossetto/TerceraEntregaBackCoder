import { logger } from '../helpers/log4js'
import passport from 'passport'

import { validPassword } from '../helpers/validPassword'
import { UserModel } from '../Models/User.model'
import { Strategy as LocalStrategy } from 'passport-local'
import { NextFunction, Request, Response } from 'express'

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async function (req, email:string, password:string, done:any) {
    try {
      let user
      try {
        user = await UserModel.findOne({ email })
      } catch (error) {

      }

      if (!user) {
        // DONE: primer parametro va un error o null y segundo si la persona esta autenticada
        return done(null, false)
      }

      // * SI HAY USUARIO... VALIDAMOS PASSWORD

      const isValidPassword = await validPassword(password, user.password)

      if (!isValidPassword) {
        return done(null, false, { message: 'Invalid password' })
      }
      // * SI LA CONTRASEÑA ES CORRECTA...
      const finalUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.name,
        phone: user.phone
      }

      return done(null, finalUser)
    } catch (error) {
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
    logger.info('el usuario se autentico')
    // @ts-ignore
    done(null, { email: result.email, id: result._id, name: result.name, avatar: result.avatar, phone: result.phone })
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
    logger.info('user is not authenticated')
    res.redirect('/sign-in')
  }
}
