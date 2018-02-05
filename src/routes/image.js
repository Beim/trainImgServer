const router = require('koa-router')()

const models = require('../model')
const middleware = require('../lib/middleware')
const Ret = require('../lib/Ret')

/*
x POST /image/raw {projectId, labelNo, data} # 上传图片接口
x POST /image/record {label, projectId, fetchImageTaskId} # 上传图片记录
x GET /images?xx=xx&&xx=xx # 查询图片记录
x PUT /image/:label?isTrained=true # 更新图片记录（未训练->已训练）
*/

/*
POST /image/raw {projectId, labelNo, data} # 上传图片接口
*/
router.post('/image/raw',
    middleware.validateRequestBody('projectId', 'labelNo', 'data'),
    async (ctx, next) => {
        await next()
    })

/*
POST /image/record {label, projectId, fetchImageTaskId} # 上传图片记录
*/
router.post('image/record',
    middleware.validateRequestBody('label', 'projectId', 'fetchImageTaskId'),
    async (ctx, next) => {
        await next()
    })

/*
GET /images?xx=xx&&xx=xx # 查询图片记录
*/
router.get('/images',
    async (ctx, next) => {
        const query = ctx.query
        try {
            const ret = await models.Image.findAll({where: query})
            ctx.body = Ret(1, '', ret)
        }
        catch (e) {
            ctx.body = Ret(0, '', e)
        }
        await next()
    })

/*
PUT /image/:label?isTrained=true # 更新图片记录（未训练->已训练）
*/
router.put('/image/:label',
    middleware.validateQueryParam('isTrained'),
    async (ctx, next) => {
        const query = ctx.query
        const params = ctx.params
        try {
            const imageRecord = await models.Image.findOne({where: {label: params['label']}})
            const ret = imageRecord.update({isTrained: query['isTrained'] === 'true'})
            ctx.body = Ret(1, '', ret)
        }
        catch (e) {
            ctx.body = Ret(0, '', e)
        }
        await next()
    })

module.exports = router

