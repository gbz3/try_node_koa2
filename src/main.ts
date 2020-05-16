import Koa from 'koa'
import { Context, DefaultState } from 'koa'
import Router from '@koa/router'
import views from 'koa-views'
import path from 'path'

const app = new Koa()
const router = new Router<DefaultState, Context>()

router
  .get('/', async (ctx, next) => {
    await next()
    await ctx.render('index')
  })

const __dirname = path.dirname(new URL(import.meta.url).pathname)
app.use(views(`${__dirname}/../views`, { autoRender: true, extension: 'pug' }))
app.use(router.routes())

app.listen(8080, '0.0.0.0')
