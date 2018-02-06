const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const path = require('path')

const routes = require(path.resolve(__dirname, 'routes'))
const config = require(path.resolve(__dirname, 'config'))

const initdb = require('./dev/initdb')

const app = new Koa()

app.use(async (ctx, next) => {
    await next()
})

app.use(bodyParser())
for (let router in routes) {
    app.use(routes[router].routes()).use(routes[router].allowedMethods())
}

app.listen(config.system.server_port)
