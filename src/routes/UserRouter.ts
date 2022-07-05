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
    if (result.error) {
      logger.error(result.data)

      res.json(result).status(200)
    } else {
      res.redirect('/sign-in')
    }
  } catch (error) {
    logger.error(error)
    res.json({
      error: true,
      code: 4,
      data: { message: 'Ocurrio un error interno' }
    }).status(500)
  }
})

userRouter.post('/logout', isAuth, (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err) }
    logger.info('el usuario cerro sesion')
    res.redirect('/sign-in')
  })
})

userRouter.get('/profile', isAuth, async (req: Request, res: Response) => {
  res.json(req.user).status(200)
})

userRouter.post('/createOrder', isAuth, async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const result = await userController.createOrder(req.user.id, req.body.cart)
    if (result?.error) {
      res.json(result).status(400)
    } else {
      res.json(result).status(200)
    }
  } catch (error) {
    logger.error(error)
    res.json({
      error: true,
      code: 4,
      data: { message: 'Ocurrio un error interno' }
    }).status(500)
  }
})
export default userRouter
