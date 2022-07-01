import { logger } from '../helpers/log4js'
import { ProductModel } from '../Models/ProductModel'

export default class ProductsService {
  async getAllProducts () {
    try {
      const products = await ProductModel.find({})
      return products
    } catch (error) {
      logger.error(error)
      return ({
        error: true,
        code: 4,
        data: { message: 'Ocurrio un error interno' }
      })
    }
  }
}
