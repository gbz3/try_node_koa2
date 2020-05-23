import * as Koa from 'koa'
import * as Router from '@koa/router'
import * as views from 'koa-views'
import * as JsYaml from 'js-yaml'
import * as Fs from 'fs'
import * as Log4js from 'log4js'

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
const logger = log4js.getLogger()

const config = JsYaml.safeLoad(Fs.readFileSync('config.yaml', { encoding: 'utf-8' }))
const app = new Koa()
const serveLogger = log4js.getLogger('serve')
serveLogger.addContext('requestId', '00000000-0000-0000-0000-000000000000')
app.context.logger = serveLogger
const router = new Router<Koa.DefaultState, Koa.Context>()

router
  .get('/', async (ctx, next) => {
    ctx.logger.info('OK?')
    await next()
    await ctx.render('index')
  })

app.use(views(`${__dirname}/../views`, { autoRender: true, extension: 'pug' }))
app.use(router.routes())

app.listen(config.app.port, config.app.hostname)
logger.info(`Server Started. port=${config.app.port} hostname=${config.app.hostname}`)
