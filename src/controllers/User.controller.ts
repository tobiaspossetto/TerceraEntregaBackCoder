import { logger } from '../helpers/log4js'
import UserService from '../services/User.service'
import { Iorder } from '../../types/producTypes'
import { IdataUserRegistration } from '../../types/userTypes'
import { NextFunction, Request, Response } from 'express'
const userService = new UserService()
export default class UserController {
  async signIn (req: Request, res: Response) {
    res.redirect('/')
  }

  async logOut (req: Request, res: Response, next: NextFunction) {
    req.logout(function (err) {
      if (err) { return next(err) }
      logger.info('el usuario cerro sesion')
      res.redirect('/sign-in')
    })
  }

  async signUp (req: Request, res: Response) {
    try {
      const userData:IdataUserRegistration = req.body
      if (!userData.name || !userData.email || !userData.password) {
        return res.status(400).json({
          error: true,
          data: { message: 'Faltan datos' }
        })
      }
      const result = await userService.signUp({ ...userData, avatar: req.file?.path })
      if (result.error) {
        return res.status(400).json({
          error: true,
          data: { ...result.data }
        })
      } else {
        return res.status(200).json({
          error: false,
          data: { ...result.data }
        })
      }
    } catch (error) {
      logger.error(error)
      return res.status(500).json({
        error: true,
        data: { message: 'Error del servidor' }
      })
    }
  }

  async getProfile (req: Request, res: Response) {
    res.json(req.user).status(200)
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
