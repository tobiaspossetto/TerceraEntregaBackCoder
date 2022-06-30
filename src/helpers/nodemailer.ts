import nodemailer from 'nodemailer'
import { Iemail } from '../types/emailTypes'
import { logger } from './log4js'
import dotenv from 'dotenv'

dotenv.config()
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tango45245362@gmail.com',
    pass: process.env.GMAIL_PASSWORD
  }
})

export const sendMail = async (info:Iemail) => {
  const mailOptions = {
    from: 'tango45245362@gmail.com',
    to: info.to,
    subject: info.subject,
    text: info.text
  }

  try {
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        logger.error(error)
      } else {
        logger.info('Email sent: ' + info.response)
        return true
      }
    })
  } catch (error) {
    logger.error(error)
    return false
  }
}
