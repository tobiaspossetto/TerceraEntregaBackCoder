'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const nodemailer_1 = __importDefault(require('nodemailer'))
const transporter = nodemailer_1.default.createTransport({
  service: 'gmail',
  auth: {
    user: 'tango45245362@gmail.com',
    pass: 'cpwhhtbrjonnjffg'
  }
})
const mailOptions = {
  from: 'tango45245362@gmail.com',
  to: 'tobigpossetto@gmail.com',
  subject: 'Invoices due',
  text: 'Dudes, we really need your money.'
}
try {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
} catch (error) {
  console.log(error)
}
