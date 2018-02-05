const router = require('koa-router')()

const models = require('../model')
const middleware = require('../lib/middleware')
const Ret = require('../lib/Ret')

/*
o POST /task # 新增任务
o GET /tasks?projectId=1&&isFetched=false # 获取任务
o PUT /task/:taskId?isFetched=true # 更新任务完成状态
o GET /task/:taskId # 获取任务
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
        const body = ctx.request.body
        const element = {
            fetchPath: body['fetchPath'],
            projectId: parseInt(body['projectId']),
        }
        try {
            const ret = await models.FetchImageTask.create(element)
            ctx.body = Ret(1, '', ret)
        }
        catch (e) {
            ctx.body = Ret(0, '', e)
        }
        await next()
    })

/*
GET /tasks?projectId=1&&isFetched=false # 获取任务
*/
router.get('/tasks',
    middleware.validateQueryParam('projectId', 'isFetched'),
    async (ctx, next) => {
        const query = ctx.query
        const limits = {
            projectId: parseInt(query['projectId']),
            isFetched: query['isFetched'] === 'true'
        }
        try {
            const ret = await models.FetchImageTask.findAll({where: limits})
            ctx.body = Ret(1, '', ret)
        }
        catch (e) {
            ctx.body = Ret(0, '', e)
        }
        await next()
    })

/*
PUT /task/:taskId?isFetched=true # 更新任务完成状态
*/
router.put('/task/:taskId',
    middleware.validateQueryParam('isFetched'),
    async (ctx, next) => {
        const query = ctx.query
        const params = ctx.params
        try {
            const task = await models.FetchImageTask.findById(params['taskId'])
            const ret = await task.update({ isFetched: query['isFetched'] })
            ctx.body = Ret(1, '', ret)
        }
        catch (e) {
            ctx.body = Ret(0, '', e)
        }
        await next()
    })

/*
GET /task/:taskId # 获取任务
*/
router.get('/task/:taskId',
    async (ctx, next) => {
        const params = ctx.params
        try {
            const ret = await models.FetchImageTask.findById(params['taskId'])
            ctx.body = Ret(1, '', ret)
        }
        catch (e) {
            ctx.body = Ret(0, '', e)
        }
    })

module.exports = router

