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
const UserModel_1 = require("../Models/UserModel");
class UserService {
    signIn() {
        return __awaiter(this, void 0, void 0, function* () {
            return 1;
        });
    }
    logOut() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    signUp(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // se crea al usuario
            const newUser = new UserModel_1.UserModel();
            newUser.email = userData.email;
            newUser.password = newUser.encryptPassword(userData.password);
            newUser.name = userData.name;
            newUser.address = userData.address;
            newUser.phone = userData.phone;
            newUser.avatar = userData.avatar;
            yield newUser.save();
            log4js_1.logger.info('User created');
            return true;
        });
    }
}
exports.default = UserService;
