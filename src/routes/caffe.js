const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const os = require('os')

const models = require('../model')
const middleware = require('../lib/middleware')
const Ret = require('../lib/Ret')
const caffeUtil = require('../lib/caffeUtil')
const util = require('../lib/util')

/*
o POST /caffemodel/:projectId {caffemodel} # 上传某个项目的caffemodel
x GET /caffe/:projectId {image} # 上传图片调用接口，返回label
*/

router.post('/caffemodel/:projectId', 
    middleware.validateRequestBody('caffemodel'),
    async (ctx, next) => {
        const params = ctx.params
        const body = ctx.request.body
        const projectId = parseInt(params['projectId'])
        let projectName = null
        try {
            const ret = await models.Project.findById(projectId)
            if (!ret) throw(`projectId(${projectId}) not found`)
            projectName = ret.get('name')
        }
        catch (e) {
            return ctx.body = Ret(0, '', e)
        }
        const location = path.resolve(__dirname, '../caffeModels', projectName, 'model.caffemodel')
        if (fs.existsSync(location)) fs.unlinkSync(location)
        util.saveFile(body['caffemodel'], location)
        ctx.body = Ret(1)
        await next()
    })

router.get('/caffe/:projectId',
    middleware.validateRequestBody('image'),
    async (ctx, next) => {
        const params = ctx.params
        const body = ctx.request.body
        const projectId = parseInt(params['projectId'])
        // 获取caffemodel的路径
        let projectName = null
        try {
            const ret = await models.Project.findById(projectId)
            if (!ret) throw(`projectId(${projectId}) not found`)
            projectName = ret.get('name')
        }
        catch (e) {
            return ctx.body = Ret(0, '', e)
        }
        const modelLocation = path.resolve(__dirname, '../caffeModels', projectName, 'model.caffemodel')
        if (!fs.existsSync(modelLocation)) {
            return ctx.body = Ret(0, `caffemodel(${modelLocation}) not found`)
        }

        // 保存图片到临时文件
        const tmpImgPath = path.join(os.tmpdir(), `caffemodel-${new Date().getTime().toString()}`)
        util.saveFile(body['image'], tmpImgPath)

        ctx.body = Ret(1, '', {
            modelLocation,
            tmpImgPath
        })
        await next()
    })

module.exports = router

