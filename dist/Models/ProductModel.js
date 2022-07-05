"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productsCollection = 'products';
const ProductSchema = new mongoose_1.default.Schema({
    id: { type: String },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    stock: { type: Number, required: true },
    category: { type: String, required: true }
});
exports.ProductModel = mongoose_1.default.model(productsCollection, ProductSchema);
