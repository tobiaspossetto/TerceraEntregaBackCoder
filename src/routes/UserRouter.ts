import { Router, Request, Response } from 'express'
import passport from 'passport'
import UserController from '../controllers/UserController'
import { logger } from '../helpers/log4js'
import { multerCheck, upload } from '../middlewares/multer'
import { isAuth } from '../middlewares/passportMiddleware'

const userController = new UserController()
const userRouter = Router()

userRouter.post('/sign-in', passport.authenticate('local'), async (req: Request, res: Response) => {
  res.redirect('/')
})

userRouter.post('/sign-up', upload.single('avatar'), multerCheck, async (req: Request, res: Response) => {
  try {
    const result = await userController.signUp({ ...req.body, avatar: req.file?.path })
    logger.info('se creo al usuario')
    if (result) {
      try {
        await passport.authenticate('local')
        if (req.isAuthenticated()) {
          res.redirect('/')
        } else {
          res.redirect('/sign-in')
        }
      } catch (error) {
        res.redirect('/sign-in')
      }
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
