import * as winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({stack: true}),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: new winston.transports.Console(),
})

export default function (fileName: string) {
  return {
    info: function (msg: string, vars?: any) {
      logger.info(fileName + ': ' + msg, vars)
    },
    export: function (msg: string, vars?: any) {
      logger.info(msg, vars)
    },
    debug: function (msg: string, vars?: any) {
      logger.debug(fileName + ': ' + msg, vars)
    },
    warn: function (msg: string, vars?: any) {
      logger.warn(fileName + ': ' + msg, vars)
    },
    error: function (msg: string, vars?: any) {
      logger.error(fileName + ': ' + msg, vars)
    },
  }
}
