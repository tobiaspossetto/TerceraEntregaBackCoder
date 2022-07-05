"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSms = exports.sendWpp = void 0;
const log4js_1 = require("./log4js");
const accountSid = process.env.TWILLIO_ACCOUNT_SID;
const authToken = process.env.TWILLIO_ACCOUNT_authToken;
const client = require('twilio')(accountSid, authToken);
const sendWpp = (body) => {
    client.messages
        .create({
        body,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5493564528523'
    })
        .then((message) => {
        log4js_1.logger.info('WPP enviado');
        return 1;
    })
        .catch((err) => {
        log4js_1.logger.error(err);
        return 0;
    })
        .done();
};
exports.sendWpp = sendWpp;
const sendSms = (body, to, email) => {
    client.messages
        .create({
        body,
        from: '+1 719 745 8081',
        to
    })
        .then((message) => {
        log4js_1.logger.info('SMS enviado');
        return 1;
    })
        .catch((err) => {
        log4js_1.logger.error(err);
        (0, exports.sendSms)('Ocurrio un error enviando la notificacion del pedido a ' + email, '+543564528523');
        return 0;
    })
        .done();
};
exports.sendSms = sendSms;
