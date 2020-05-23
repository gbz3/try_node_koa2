import * as Koa from 'koa'
import * as Log4js from 'log4js'
import { v4 as uuidv4 } from 'uuid'

const log4js = Log4js.configure({
  appenders: {
    'serve': { type: 'stdout', layout: { type: 'pattern', pattern: '[%d] [%p] [%X{requestId}] : %m' } },
    'other': { type: 'stdout', layout: { type: 'pattern', pattern: '[%d] [%p] : %m' } }
  },
  categories: {
    "serve": { appenders: ['serve'], level: 'debug' },
    default: { appenders: ['other'], level: 'debug' }
  }
})

export function getNoServeLogger(): Log4js.Logger {
  return log4js.getLogger()
}

export function useServeLogger() {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    const logger = log4js.getLogger('serve')
    logger.addContext('requestId', ctx.request.get('X-Request-Id') || uuidv4())
    ctx.logger = logger
    await next()
  }
}
