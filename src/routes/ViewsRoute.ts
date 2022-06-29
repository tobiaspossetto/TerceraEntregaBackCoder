import { Router, Request, Response } from 'express'
import { isAuth } from '../middlewares/passportMiddleware'
const routerViews = Router()

routerViews.get('/', isAuth, (req: Request, res: Response) => {
  res.render('index.pug')
})
routerViews.get('/sign-in', (req: Request, res: Response) => {
  res.render('signin.pug')
})
routerViews.get('/sign-up', (req: Request, res: Response) => {
  res.render('signup.pug')
})
export default routerViews
