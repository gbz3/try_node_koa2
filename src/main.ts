import Koa from 'koa'
import Router from '@koa/router'
import views from 'koa-views'
import Path from 'path'
import JsYaml from 'js-yaml'
import Fs from 'fs'

const config = JsYaml.safeLoad(Fs.readFileSync('config.yaml', { encoding: 'utf-8' }))
const app = new Koa()
const router = new Router<Koa.DefaultState, Koa.Context>()

router
  .get('/', async (ctx, next) => {
    await next()
    await ctx.render('index')
  })

const __dirname = Path.dirname(new URL(import.meta.url).pathname)
app.use(views(`${__dirname}/../views`, { autoRender: true, extension: 'pug' }))
app.use(router.routes())

app.listen(config.app.port, config.app.hostname)
