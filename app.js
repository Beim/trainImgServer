const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

app.use(bodyParser())

router.get('/', (ctx, next) => {
    ctx.body = 'koa-router'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
