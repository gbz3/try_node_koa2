import * as Koa from 'koa'
import * as Router from '@koa/router'
import * as views from 'koa-views'
import * as JsYaml from 'js-yaml'
import * as Fs from 'fs'
import * as Logger from './middleware/logger'

const logger = Logger.getNoServeLogger()

const config = JsYaml.safeLoad(Fs.readFileSync('config.yaml', { encoding: 'utf-8' }))
const app = new Koa()
const router = new Router<Koa.DefaultState, Koa.Context>()

router
  .get('/', async (ctx, next) => {
    ctx.logger.info('OK?')
    await next()
    await ctx.render('index')
  })

app.use(Logger.useServeLogger())
app.use(views(`${__dirname}/../views`, { autoRender: true, extension: 'pug' }))
app.use(router.routes())

app.listen(config.app.port, config.app.hostname)
logger.info(`Server Started. port=${config.app.port} hostname=${config.app.hostname}`)
