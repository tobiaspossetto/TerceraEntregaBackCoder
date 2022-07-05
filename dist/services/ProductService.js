"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = require("../helpers/log4js");
const ProductModel_1 = require("../Models/ProductModel");
class ProductsService {
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield ProductModel_1.ProductModel.find({});
                return {
                    error: false,
                    data: [...products]
                };
            }
            catch (error) {
                log4js_1.logger.error(error);
                return ({
                    error: true,
                    data: { message: 'Ocurrio un error interno' }
                });
            }
        });
    }
    getProductsByCategory(cat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield ProductModel_1.ProductModel.find({ category: cat });
                return {
                    error: false,
                    data: [...products]
                };
            }
            catch (error) {
                log4js_1.logger.error(error);
                return ({
                    error: true,
                    data: { message: 'Ocurrio un error interno' }
                });
            }
        });
    }
    getProductsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield ProductModel_1.ProductModel.findById(id);
                if (product == null) {
                    return {
                        error: true,
                        data: { message: 'El producto no se encontro' }
                    };
                }
                else {
                    return {
                        error: false,
                        data: product
                    };
                }
            }
            catch (error) {
                log4js_1.logger.error(error);
                return ({
                    error: true,
                    data: { message: 'Ocurrio un error interno' }
                });
            }
        });
    }
}
exports.default = ProductsService;
