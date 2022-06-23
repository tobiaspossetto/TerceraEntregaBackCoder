import log4js from 'log4js'

log4js.configure({
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

})

export const logger = log4js.getLogger('default')
