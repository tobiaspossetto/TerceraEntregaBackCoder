import { Router, Request, Response } from 'express'
import passport from 'passport'
import UserController from '../controllers/UserController'
import { logger } from '../helpers/log4js'
import { multerCheck, upload } from '../middlewares/multer'
import { isAuth } from '../middlewares/passportMiddleware'

const userController = new UserController()
const userRouter = Router()

userRouter.post('/sign-in', passport.authenticate('local'), async (req: Request, res: Response) => {
  res.send('ok')
  // try {
  //   const result = await userController.signIn()
  //   res.send(result)
  // } catch (error) {
  //   logger.error(error)
  //   res.send(error)
  // }
})

userRouter.post('/sign-up', upload.single('avatar'), multerCheck, async (req: Request, res: Response) => {
  try {
    const result = await userController.signUp({ ...req.body, avatar: req.file?.path })
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

// isAuth

userRouter.get('/', isAuth, async (req: Request, res: Response) => {
  res.send('ruta protegida')
})
export default userRouter
