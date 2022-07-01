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
exports.UserModel = void 0;
const crypto_1 = require("crypto");
const mongoose_1 = __importDefault(require("mongoose"));
const productsCollection = 'products';
const ProductSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    descripcion: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    stock: { type: Number, required: true },
    category: { type: String, required: true }
});
exports.UserModel = mongoose_1.default.model(productsCollection, ProductSchema);
function saveProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 15; i++) {
            const products = {
                name: `product ${i}`,
                descripcion: `Descripcion del producto ${i}`,
                price: (0, crypto_1.randomInt)(100, 10000),
                image: 'https://picsum.photos/200/300',
                stock: (0, crypto_1.randomInt)(1, 10),
                category: `Category ${(0, crypto_1.randomInt)(1, 3)}`
            };
            const prod = yield exports.UserModel.create(products);
            prod.save();
        }
    });
}
saveProducts();
