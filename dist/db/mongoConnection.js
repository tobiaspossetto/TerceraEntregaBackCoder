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
exports.getConnectionMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const log4js_1 = require("../helpers/log4js");
// eslint-disable-next-line require-jsdoc
function getConnectionMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // eslint-disable-next-line quotes
            yield mongoose_1.default.connect(`mongodb+srv://tobias:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.ulmpx.mongodb.net/ecommerce?retryWrites=true&w=majority`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            log4js_1.logger.info('MongoDB Connected');
        }
        catch (error) {
            log4js_1.logger.error(error);
            // TODO: Me parecio que cortar el proceso del servidor si no se podia conectar a la base de datos era una buena opcion
            process.exit(1);
        }
    });
}
exports.getConnectionMongo = getConnectionMongo;
