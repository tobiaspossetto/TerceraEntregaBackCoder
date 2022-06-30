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
const log4js_1 = require("../helpers/log4js");
const UserService_1 = __importDefault(require("../services/UserService"));
const userService = new UserService_1.default();
class UserController {
    signIn() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    logOut() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    signUp(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield userService.signUp(userData);
                if (res) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                log4js_1.logger.error(error);
                return false;
            }
        });
    }
}
exports.default = UserController;
