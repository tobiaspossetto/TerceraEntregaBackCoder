"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    appenders: {
        // defino dos soportes de salida de datos
        consola: { type: 'console' },
        warningFile: { type: 'file', filename: 'warning.log' },
        errorFile: { type: 'file', filename: 'error.log' },
        // defino sus niveles de logueo
        loggerConsola: { type: 'logLevelFilter', appender: 'consola', level: 'info' },
        loggerError: { type: 'logLevelFilter', appender: 'errorFile', level: 'error' }
    },
    categories: {
        default: {
            appenders: ['loggerConsola', 'loggerError'], level: 'all'
        }
    }
});
exports.logger = log4js_1.default.getLogger('default');
