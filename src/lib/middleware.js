const Ret = require('./Ret')

const middleware = {}

middleware.validateRequestBody = (...args) => {
    return async (ctx, next) => {
        let body = ctx.request.body
        for (let arg of args) {
            if (body[arg] === undefined) {
                return ctx.body = Ret(0, `missing requestBody '${arg}'`)
            }
        }
        await next()
    }
}

middleware.validateQueryParam = (...args) => {
    return async (ctx, next) => {
        let query = ctx.query
        for (let arg of args) {
            if (query[arg] === undefined) {
                return ctx.body = Ret(0, `missing queryParam '${arg}'`)
            }
        }
        await next()
    }
}

module.exports = middleware