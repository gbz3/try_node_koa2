import Koa from 'koa'
import Router from '@koa/router'

const app = new Koa()
const router = new Router()

router
  .get('/', async (ctx, next) => {
    await next()

    ctx.body = '{}'
    ctx.response.set('content-type', 'application/json; charset=utf-8')
  })

app.use(router.routes())

app.listen(8080, '0.0.0.0')
