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
const passport_1 = __importDefault(require("passport"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const log4js_1 = require("../helpers/log4js");
const multer_1 = require("../middlewares/multer");
const passportMiddleware_1 = require("../middlewares/passportMiddleware");
const userController = new UserController_1.default();
const userRouter = (0, express_1.Router)();
userRouter.post('/sign-in', passport_1.default.authenticate('local'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect('/');
}));
userRouter.post('/sign-up', multer_1.upload.single('avatar'), multer_1.multerCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield userController.signUp(Object.assign(Object.assign({}, req.body), { avatar: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path }));
        if (result.error) {
            log4js_1.logger.error(result.data);
            res.json(result).status(400);
        }
        else {
            res.redirect('/sign-in');
        }
    }
    catch (error) {
        log4js_1.logger.error(error);
        res.json({
            error: true,
            code: 4,
            data: { message: 'Ocurrio un error interno' }
        });
    }
}));
userRouter.post('/logout', passportMiddleware_1.isAuth, (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/sign-in');
    });
});
exports.default = userRouter;
