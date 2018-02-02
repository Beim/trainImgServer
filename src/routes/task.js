const router = require('koa-router')()

const models = require('../model')
const middleware = require('../lib/middleware')
const Ret = require('../lib/Ret')


/*
x POST /task # 新增任务
x GET /tasks/:projectId?isTrained=false # 获取任务
*/

/*
/task
{
    fetchPath: '',
    projectId: 0,
}
*/
router.post('/task', 
    middleware.validateRequestBody('fetchPath', 'projectId'),
    async (ctx, next) => {
        let body = ctx.request.body
        console.log(body)
        ctx.body = Ret(1)
        await next()
    })

/*
/tasks/:projectId?isTrained=false
*/
router.get('/tasks/:projectId',
    middleware.validateQueryParam('isTrained'),
    async (ctx, next) => {
        let query = ctx.query
        console.log(query)
        ctx.body = Ret(1)
        await next()
    })

module.exports = router

