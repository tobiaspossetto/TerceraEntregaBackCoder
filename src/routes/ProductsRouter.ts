import { Router, Request, Response } from 'express'

import ProductController from '../controllers/ProductController'

import { logger } from '../helpers/log4js'

import { isAuth } from '../middlewares/passportMiddleware'

const productsRouter = Router()
const controller = new ProductController()
productsRouter.get('/', isAuth, async (req: Request, res: Response) => {
  try {
    const result = await controller.getAllProducts()

    res.json(result).status(200)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: true, data: { message: 'Ocurrio un error interno' } })
  }
})

productsRouter.get('/cat/:cat', isAuth, async (req: Request, res: Response) => {
  try {
    const result = await controller.getProductsByCategory(req.params.cat)

    res.json(result).status(200)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: true, data: { message: 'Ocurrio un error interno' } })
  }
})

productsRouter.get('/:id', isAuth, async (req: Request, res: Response) => {
  try {
    const result = await controller.getProductsById(req.params.id)

    res.json(result).status(200)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: true, data: { message: 'Ocurrio un error interno' } })
  }
})
export default productsRouter
