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
const nodemailer_1 = require("../helpers/nodemailer");
const twillio_1 = require("../helpers/twillio");
const OrderModel_1 = require("../Models/OrderModel");
const ProductModel_1 = require("../Models/ProductModel");
const UserModel_1 = require("../Models/UserModel");
class UserService {
    signIn() {
        return __awaiter(this, void 0, void 0, function* () {
            return 1;
        });
    }
    logOut() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    signUp(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
              Manejo de errores:
        
              # code 2 = email ya usado
              # code 3 = ocurrio un error interno al crear al usuario
              # en caso de exito emailNotification indica si se pudo enviar la notification por correo o ocurrio un fallo al enviarla
            */
            // se crea al usuario
            const exist = yield UserModel_1.UserModel.findOne({ email: userData.email });
            if (exist) {
                log4js_1.logger.info('El usuario ya existe');
                return {
                    error: true,
                    code: 2,
                    data: {
                        message: 'El email ya es utilizado',
                        emailNotification: false
                    }
                };
            }
            try {
                const newUser = new UserModel_1.UserModel();
                newUser.email = userData.email;
                newUser.password = newUser.encryptPassword(userData.password);
                newUser.name = userData.name;
                newUser.address = userData.address;
                newUser.phone = userData.phone;
                newUser.avatar = userData.avatar;
                yield newUser.save();
                log4js_1.logger.info('User created');
                const emailStatus = yield (0, nodemailer_1.sendMail)({
                    to: 'tango45245362@gmail.com',
                    subject: 'Nuevo registro en la app',
                    text: `Hola!! Con este correo se notifica que: ${newUser.name}, ha sido registrado con exito. 🥳️
          DATOS DEL NUEVO USUARIO:
          Nombre: ${newUser.name}
          Direccion: ${newUser.address}
          Telefono: ${newUser.phone}

        `
                });
                if (emailStatus) {
                    return {
                        error: false,
                        code: 1,
                        data: {
                            message: 'Usuario registrado con exito',
                            emailNotification: true
                        }
                    };
                }
                else {
                    return {
                        error: false,
                        code: 1,
                        data: {
                            message: 'Usuario registrado con exito, fallo al mandar correo de notificacion',
                            emailNotification: false
                        }
                    };
                }
            }
            catch (error) {
                log4js_1.logger.error(error);
                return {
                    error: true,
                    code: 3,
                    data: {
                        message: 'Fallo interno al registrar usuario',
                        emailNotification: false
                    }
                };
            }
        });
    }
    createOrder(userId, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.UserModel.findById(userId);
                const prods = yield ProductModel_1.ProductModel.find({
                    _id: {
                        $in: cart.map(item => item.productId)
                    }
                });
                const finalProducts = prods.map(item => {
                    var _a;
                    return {
                        _id: item._id,
                        name: item.name,
                        price: item.price,
                        quantity: (_a = cart.find(i => i.productId === item._id.toString())) === null || _a === void 0 ? void 0 : _a.quantity
                    };
                });
                const order = {
                    user: {
                        _id: user === null || user === void 0 ? void 0 : user._id,
                        name: user === null || user === void 0 ? void 0 : user.name,
                        email: user === null || user === void 0 ? void 0 : user.email,
                        address: user === null || user === void 0 ? void 0 : user.address,
                        phone: user === null || user === void 0 ? void 0 : user.phone
                    },
                    products: finalProducts,
                    totalPrice: prods.reduce((acc, cur) => acc + cur.price, 0),
                    totalItems: cart.reduce((acc, cur) => acc + cur.quantity, 0)
                };
                const newOrder = new OrderModel_1.OrderModel(order);
                newOrder.save(function (err, result) {
                    if (err) {
                        log4js_1.logger.error(err);
                        return ({
                            error: true,
                            data: { message: 'Ocurrio un error creando el pedido' }
                        });
                    }
                    else {
                        log4js_1.logger.warn(result);
                        (0, nodemailer_1.sendMail)({
                            to: 'tango45245362@gmail.com',
                            subject: 'Nuevo pedido en la app',
                            text: `Hola!! Con este correo se notifica que: ${user === null || user === void 0 ? void 0 : user.name}, ha realizado un nuevo pedido. 🥳️.
            Esta es la información del pedido: 
            ${JSON.stringify(order, null, 2)}
            
            `
                        });
                        (0, twillio_1.sendSms)(`Hola ${user === null || user === void 0 ? void 0 : user.name}! Tu pedido está en camino!! Puedes ver el estado del pedido con este código: ${result._id}`, user === null || user === void 0 ? void 0 : user.phone, user === null || user === void 0 ? void 0 : user.email);
                        (0, twillio_1.sendWpp)(`Hola!! Con este mensaje se notifica que: ${user === null || user === void 0 ? void 0 : user.name}, ha realizado un nuevo pedido. 🥳️.
          Esta es la información del pedido: 
          ${JSON.stringify(order, null, 2)}
          
          `);
                        log4js_1.logger.info('Order created');
                        return {
                            error: false,
                            code: 1,
                            data: {
                                message: 'Orden creada con exito'
                            }
                        };
                    }
                });
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
exports.default = UserService;
