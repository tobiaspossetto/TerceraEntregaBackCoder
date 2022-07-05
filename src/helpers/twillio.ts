import { logger } from './log4js'

const accountSid = process.env.TWILLIO_ACCOUNT_SID
const authToken = process.env.TWILLIO_ACCOUNT_authToken
const client = require('twilio')(accountSid, authToken)

export const sendWpp = (body: string) => {
  client.messages
    .create({
      body,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+5493564528523'
    })
    .then((message: any) => {
      logger.info('WPP enviado')
      return 1
    })
    .catch((err: any) => {
      logger.error(err)
      return 0
    })
    .done()
}

export const sendSms = (body: string, to:any, email?:any) => {
  client.messages
    .create({
      body,
      from: '+1 719 745 8081',
      to
    })
    .then((message: any) => {
      logger.info('SMS enviado')
      return 1
    })
    .catch((err: any) => {
      logger.error(err)
      sendSms('Ocurrio un error enviando la notificacion del pedido a ' + email, '+543564528523')
      return 0
    })
    .done()
}
