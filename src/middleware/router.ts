import * as Koa from 'koa'
import * as Router from '@koa/router'
import * as Logger from './logger'

const router = new Router<Koa.DefaultState, Koa.Context>()

router
  .use(Logger.useServeLogger())  // ctx.logger でログ出力メソッドが利用可能
  .get('/', async (ctx, next) => {
    ctx.logger.info('OK?')
    await next()
    await ctx.render('index')
  })

export function useRouter() {
  return router.routes()
}
