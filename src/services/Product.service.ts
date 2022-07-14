
import { logger } from '../helpers/log4js'

import ProductPersistense from '../persistence/Product.persistence'
const persistence = new ProductPersistense()
export default class ProductsService {
  async getAllProducts () {
    try {
      const products:any = await persistence.getAllProducts()
      if (products.error) {
        return {
          error: true,
          data: { message: products.data.message }
        }
      }
      return products
    } catch (error) {
      logger.error(error)
      return ({
        error: true,

        data: { message: 'Ocurrio un error interno' }
      })
    }
  }

  async getProductsByCategory (cat:string) {
    try {
      const products:any = await persistence.getByCategory(cat)
      return {
        error: false,
        data: [products.data]
      }
    } catch (error) {
      logger.error(error)
      return ({
        error: true,

        data: { message: 'Ocurrio un error interno' }
      })
    }
  }

  async getProductsById (id:string) {
    try {
      const product:any = await persistence.getById(id)
      if (product.error) {
        return {
          error: true,
          data: { message: product.data.message }
        }
      } else {
        return {
          error: false,
          data: product.data
        }
      }
    } catch (error) {
      logger.error(error)
      return ({
        error: true,

        data: { message: 'Ocurrio un error interno' }
      })
    }
  }
}
