"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ordersCollection = 'orders';
const OrderSchema = new mongoose_1.default.Schema({
    id: { type: String },
    createdAt: { type: Date, default: Date.now },
    user: {
        id: { type: String },
        name: { type: String },
        email: { type: String },
        address: { type: String },
        phone: { type: String }
    },
    products: [
        {
            id: { type: String },
            name: { type: String },
            price: { type: Number },
            quantity: { type: Number }
        }
    ],
    totalItems: { type: Number },
    totalPrice: { type: Number },
    status: { type: String }
});
exports.OrderModel = mongoose_1.default.model(ordersCollection, OrderSchema);
