"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const log4js_1 = require("../helpers/log4js");
const userCollection = 'users';
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    avatar: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
UserSchema.methods.encryptPassword = (password) => {
    log4js_1.logger.info(password);
    return bcryptjs_1.default.hashSync(password, 10);
};
exports.UserModel = mongoose_1.default.model(userCollection, UserSchema);
