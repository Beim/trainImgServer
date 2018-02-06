const router = require('koa-router')()

const models = require('../model')
const middleware = require('../lib/middleware')
const Ret = require('../lib/Ret')

/*
x POST /caffemodel/:projectId # 上传某个项目的caffemodel
x GET /caffe/:projectId {image} # 上传图片调用接口，返回label
*/

router.post('/caffemodel/:projectId', 
    async (ctx, next) => {

        await next()
    })

router.get('/caffe/:projectId',
    middleware.validateRequestBody('image'),
    async (ctx, next) => {
        const params = ctx.params
        const body = ctx.request.body
        
        await next()
    })

module.exports = router

