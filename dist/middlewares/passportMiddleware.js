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
exports.isAuth = void 0;
const log4js_1 = require("../helpers/log4js");
const passport_1 = __importDefault(require("passport"));
const validPassword_1 = require("../helpers/validPassword");
const UserModel_1 = require("../Models/UserModel");
const passport_local_1 = require("passport-local");
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user;
            try {
                user = yield UserModel_1.UserModel.findOne({ email });
            }
            catch (error) {
            }
            if (!user) {
                // DONE: primer parametro va un error o null y segundo si la persona esta autenticada
                return done(null, false);
            }
            // * SI HAY USUARIO... VALIDAMOS PASSWORD
            const isValidPassword = yield (0, validPassword_1.validPassword)(password, user.password);
            if (!isValidPassword) {
                return done(null, false, { message: 'Invalid password' });
            }
            // * SI LA CONTRASEÑA ES CORRECTA...
            const finalUser = {
                id: user.id,
                email: user.email,
                name: user.name,
                username: user.name,
                phone: user.phone
            };
            return done(null, finalUser);
        }
        catch (error) {
            log4js_1.logger.error(error);
            done(error);
        }
    });
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(function (id, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield UserModel_1.UserModel.findById(id);
            log4js_1.logger.info('el usuario se autentico');
            // @ts-ignore
            done(null, { email: result.email, id: result._id, name: result.name, avatar: result.avatar, phone: result.phone });
        }
        catch (error) {
            log4js_1.logger.error(error);
            done(error);
        }
    });
});
const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        // @ts-ignore
        // console.log(req.user)
        return next();
    }
    else {
        log4js_1.logger.info('user is not authenticated');
        res.redirect('/sign-in');
    }
};
exports.isAuth = isAuth;
