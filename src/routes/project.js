const router = require('koa-router')()

const models = require('../model')
const middleware = require('../lib/middleware')
const Ret = require('../lib/Ret')
const config = require('../config')

/*
x POST /project # 新增项目
x GET /project/:name # 获取项目
*/

/*
/project # 新增项目
{
    name: 'qqimage'
}
*/
router.post('/project',
    middleware.validateRequestBody('name'),
    async (ctx, next) => {
        let body = ctx.request.body
        ctx.body = Ret(1, '', body)
        await next()
    })
/*
/project/:name # 获取项目
*/
router.get('/project/:name',
    async (ctx, next) => {
        let params = ctx.params
        ctx.body = Ret(1, '', params)
        await next()
    })



module.exports = router

