import { Router, Request, Response } from 'express'
const routerViews = Router()

routerViews.get('/', (req: Request, res: Response) => {
  res.render('index.pug')
})
export default routerViews
