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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const log4js_1 = require("../helpers/log4js");
const passportMiddleware_1 = require("../middlewares/passportMiddleware");
const productsRouter = (0, express_1.Router)();
const controller = new ProductController_1.default();
productsRouter.get('/', passportMiddleware_1.isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield controller.getAllProducts();
        res.json(result);
    }
    catch (error) {
        log4js_1.logger.error(error);
        res.status(500).json({ error: true, data: { message: 'Ocurrio un error interno' } });
    }
}));
productsRouter.get('/cat/:cat', passportMiddleware_1.isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield controller.getProductsByCategory(req.params.cat);
        res.json(result);
    }
    catch (error) {
        log4js_1.logger.error(error);
        res.status(500).json({ error: true, data: { message: 'Ocurrio un error interno' } });
    }
}));
productsRouter.get('/:id', passportMiddleware_1.isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield controller.getProductsById(req.params.id);
        res.json(result);
    }
    catch (error) {
        log4js_1.logger.error(error);
        res.status(500).json({ error: true, data: { message: 'Ocurrio un error interno' } });
    }
}));
exports.default = productsRouter;
