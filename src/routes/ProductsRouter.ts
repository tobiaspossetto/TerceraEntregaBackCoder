import { Router, Request, Response } from 'express'
import passport from 'passport'
import ProductController from '../controllers/ProductController'

import { logger } from '../helpers/log4js'

import { isAuth } from '../middlewares/passportMiddleware'

const productsRouter = Router()
const controller = new ProductController()
productsRouter.get('/', isAuth, async (req: Request, res: Response) => {
  const result = await controller.getAllProducts()
  res.json(result)
})

export default productsRouter
