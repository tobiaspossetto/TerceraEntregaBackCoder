
import { logger } from '../helpers/log4js'
import ProductsService from '../services/ProductService'
const service = new ProductsService()

export default class productController {
  async getAllProducts () {
    try {
      const products = await service.getAllProducts()

      return products
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error interno' }
      }
    }
  }

  async getProductsByCategory (cat:string) {
    try {
      const products = await service.getProductsByCategory(cat)

      return products
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error interno' }
      }
    }
  }
}
