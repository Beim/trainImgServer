const path = require('path')

const router = require('koa-router')()

const models = require('../model')
const middleware = require('../lib/middleware')
const Ret = require('../lib/Ret')
const config = require('../config')

/*
o POST /project # 新增项目
o GET /projects/:name # 获取项目
o GET /project/:id # 根据id获取项目
o GET /projects # 获取所有项目
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
        const body = ctx.request.body
        const element = {
            name: body['name'],
            imgLocation: path.join(config.system.storagePath, body['name']),
        }
        try {
            const ret = await models.Project.create(element)
            ctx.body = Ret(1, '', ret)    
        }
        catch (e) {
            ctx.body = Ret(0, '', e)
        }
        await next()
    })
/*
/projects/:name # 获取项目
*/
router.get('/projects/:name',
    async (ctx, next) => {
        let params = ctx.params
        const limits = {
            name: params['name'],
        }
        try {
            const ret = await models.Project.findAll({where: limits})
            ctx.body = Ret(1, '', ret)
        }
        catch (e) {
            ctx.body = Ret(0, '', e)
        }
        await next()
    })

/*
/project/:id # 根据id获取项目
*/
router.get('/project/:id',
    async (ctx, next) => {
        let params = ctx.params
        try {
            const ret = await models.Project.findById(parseInt(params['id']))
            ctx.body = Ret(1, '', ret)
        }
        catch (e) {
            ctx.body = Ret(0, '', e)
        }
        await next()
    })

/*
/projects # 获取所有项目
*/
router.get('/projects',
    async (ctx, next) => {
        try {
            const ret = await models.Project.findAll()
            ctx.body = Ret(1, '', ret)
        }
        catch (e) {
            ctx.body = Ret(0, '', e)
        }
    })



module.exports = router

