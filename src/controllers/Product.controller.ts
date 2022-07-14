
import { Request, Response } from 'express'
import { logger } from '../helpers/log4js'
import ProductsService from '../services/Product.service'
const service = new ProductsService()

export default class productController {
  async getAllProducts (req: Request, res: Response) {
    try {
      const products = await service.getAllProducts()

      if (products.error) {
        return res.status(400).json({
          ...products
        })
      } else {
        return res.status(200).json({
          error: false,
          data: products.data
        })
      }
    } catch (error) {
      logger.error(error)
      return res.status(500).json({
        error: true,
        data: { message: 'Ocurrio un error interno' }
      })
    }
  }

  async getProductsByCategory (req: Request, res: Response) {
    try {
      const products = await service.getProductsByCategory(req.params.cat)

      if (products.error) {
        return res.status(400).json({
          ...products
        })
      } else {
        return res.status(200).json({
          error: false,
          data: products.data
        })
      }
    } catch (error) {
      logger.error(error)
      return res.status(500).json({
        error: true,
        data: { message: 'Ocurrio un error interno' }
      })
    }
  }

  async getProductsById (req: Request, res: Response) {
    try {
      const product = await service.getProductsById(req.params.id)

      if (product.error) {
        return res.status(400).json({
          ...product
        })
      } else {
        return res.status(200).json({
          error: false,
          data: product.data
        })
      }
    } catch (error) {
      logger.error(error)
      return res.status(500).json({
        error: true,
        data: { message: 'Ocurrio un error interno' }
      })
    }
  }
}
