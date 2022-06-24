import http from 'http'
import app, { PORT, args } from './app'
import cluster from 'cluster'
import { logger } from './helpers/log4js'

const numCPUs = require('os').cpus().length

if (args._[1] === 'CLUSTER' && cluster.isMaster) {
  logger.info(`I am a master ${process.pid}`)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', function (worker, code, signal) {
    logger.info('worker ' + worker.process.pid + ' died')
  })
} else {
  const server = http.createServer(app)

  // TODO: httServer para usar con socket
  const httpServer = server.listen(PORT)

  logger.info('💯️ Server on port', PORT)
}
