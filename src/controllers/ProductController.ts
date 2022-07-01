
import { logger } from '../helpers/log4js'
import ProductsService from '../services/ProductService'
const service = new ProductsService()

export default class productController {
  async getAllProducts () {
    try {
      const products = await service.getAllProducts()
      logger.info(products)
      return products
    } catch (error) {
      logger.error(error)
      return 0
    }
  }
}
