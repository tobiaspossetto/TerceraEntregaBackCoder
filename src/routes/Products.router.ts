import { Router } from 'express'

import ProductController from '../controllers/Product.controller'

import { isAuth } from '../middlewares/passportMiddleware'

const productsRouter = Router()
const controller = new ProductController()
productsRouter.get('/', isAuth, controller.getAllProducts)

productsRouter.get('/cat/:cat', isAuth, controller.getProductsByCategory)

productsRouter.get('/:id', isAuth, controller.getProductsById)
export default productsRouter
