import * as Koa from 'koa'
import * as views from 'koa-views'
import * as JsYaml from 'js-yaml'
import * as Fs from 'fs'
import * as Logger from './middleware/logger'
import * as Router from './middleware/router'

const logger = Logger.getNoServeLogger()

const config = JsYaml.safeLoad(Fs.readFileSync('config.yaml', { encoding: 'utf-8' }))
const app = new Koa()

app.use(views(`${__dirname}/../views`, { autoRender: true, extension: 'pug' }))
app.use(Router.useRouter())

app.listen(config.app.port, config.app.hostname)
logger.info(`Server Started. port=${config.app.port} hostname=${config.app.hostname}`)
