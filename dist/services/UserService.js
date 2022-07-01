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
}
exports.default = UserService;
