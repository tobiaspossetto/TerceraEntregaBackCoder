
import { logger } from '../helpers/log4js'
import { ProductModel } from '../Models/ProductModel'

export default class ProductsService {
  async getAllProducts () {
    try {
      const products:any = await ProductModel.find({})
      return {
        error: false,
        data: [...products]
      }
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
      const products:any = await ProductModel.find({ category: cat })
      return {
        error: false,
        data: [...products]
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
      const product:any = await ProductModel.findById(id)
      if (product == null) {
        return {
          error: true,
          data: { message: 'El producto no se encontro' }
        }
      } else {
        return {
          error: false,
          data: product
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
