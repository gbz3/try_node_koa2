import * as Koa from 'koa'
import * as Router from '@koa/router'

const router = new Router<Koa.DefaultState, Koa.Context>()

router
  .get('/', async (ctx, next) => {
    ctx.logger.info('OK?')
    await next()
    await ctx.render('index')
  })

export function useRouter() {
  return router.routes()
}
