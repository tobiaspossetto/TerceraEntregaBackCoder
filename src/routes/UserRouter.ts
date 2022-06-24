import { Router, Request, Response } from 'express'
import passport from 'passport'
import UserController from '../controllers/UserController'
import { logger } from '../helpers/log4js'

const userController = new UserController()
const userRouter = Router()

userRouter.post('/sign-in', passport.authenticate('local'), async (req: Request, res: Response) => {
  try {
    const result = await userController.signIn()
    res.send(result)
  } catch (error) {
    logger.error(error)
    res.send(error)
  }
})

userRouter.post('/sign-up', async (req: Request, res: Response) => {
  try {
    const result = await userController.signUp(req.body)
    if (result) {
      res.send(result).status(200)
    } else {
      res.send(false).status(400)
    }
  } catch (error) {
    logger.error(error)
    res.send(error)
  }
})
export default userRouter
