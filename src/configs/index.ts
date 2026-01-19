import { getDate } from "../utils/getDate"
import pino from 'pino'
import path from 'path'
import fs from 'fs'

const transport = pino.transport({
    targets: [
    {
      target: 'pino/file',
      options: {
        destination: path.join(__dirname, `../logs/general/logs-${getDate()}.log`),
      }
    },
    {
      target: 'pino/file',
      level: 'error',
      options: {
        destination: path.join(__dirname, `../logs/errors/errors-logs-${getDate()}.log`),
      }
    },
    {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  ]
})

export const fastifyConfig = {
    logger: pino(
      transport
    ),
    // https: {
    //   key: fs.readFileSync(path.join(__dirname, '..', './https/fastify.key')),
    //   cert: fs.readFileSync(path.join(__dirname, '..', './https/fastify.cert'))
    // },
    bodyLimit: 500 * 1024 * 1024 // Default Limit set to 5000MB
}