const router = require('koa-router')()
const path = require('path')
const fs = require('fs')

const models = require('../model')
const middleware = require('../lib/middleware')
const Ret = require('../lib/Ret')
const util = require('../lib/util')

/*
o POST /image/raw {projectId, labelNo, data} # 上传图片接口
o POST /image/record {label, projectId, fetchImageTaskId} # 上传图片记录
o GET /images?xx=xx&&xx=xx # 查询图片记录
o PUT /image/:label?isTrained=true # 更新图片记录（未训练->已训练）
o GET /image/raw?projectId=1&&labelNo=1&&imgname=1143710515 # 下拉图片
o GET /image/raw/list?projectId=1&&labelNo=1 # 获取该文件夹下文件列表
*/

/*
POST /image/raw {projectId, labelNo, data} # 上传图片接口
*/
router.post('/image/raw',
    middleware.validateRequestBody('projectId', 'labelNo', 'data'),
    async (ctx, next) => {
        const body = ctx.request.body
        body['projectId'] = parseInt(body['projectId'])
        body['labelNo'] = parseInt(body['labelNo'])
        try {
            let isImageRecordCreated = await models.Image.findOne({where: {
                projectId: body['projectId'],
                labelNo: body['labelNo'],
            }})
            if (!isImageRecordCreated) throw('projectId or labelNo not found')
            let ret = await models.Project.findById(body['projectId'])
            let imgLocation = path.join(ret.get('imgLocation'), String(body['labelNo']), String(new Date().getTime()))
            util.saveImg(body['data'], imgLocation)
            ctx.body = Ret(1)
        }
        catch (e) {
            ctx.body = Ret(0, '', e)
        }
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
POST /image/record {label, projectId, fetchImageTaskId} # 上传图片记录
*/
router.post('/image/record',
    middleware.validateRequestBody('label', 'projectId', 'fetchImageTaskId'),
    async (ctx, next) => {
        const body = ctx.request.body
        try {
            const currMaxLabelNo = await models.Image.max('labelNo', { where: { projectId: body['projectId'] } })
            const element = {
                label: body['label'],
                labelNo: isNaN(currMaxLabelNo) ? 1 : parseInt(currMaxLabelNo) + 1,
                projectId: body['projectId'],
                fetchImageTaskId: body['fetchImageTaskId'],
            }
            const ret = await models.Image.create(element)
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
            if (imageRecord === null) {
                ctx.body = Ret(0, 'label not found')
            }
            else {
                const ret = imageRecord.update({isTrained: query['isTrained'] === 'true'})
                ctx.body = Ret(1, '', ret)
            }
            
        }
        catch (e) {
            ctx.body = Ret(0, '', e)
        }
        await next()
    })


/*
GET /image/raw?projectId=1&&labelNo=1&&imgname=1143710515 # 下拉图片
*/
router.get('/image/raw',
    middleware.validateQueryParam('projectId', 'labelNo', 'imgname'),
    async (ctx, next) => {
        const query = ctx.query
        query['projectId'] = parseInt(query['projectId'])
        query['labelNo'] = parseInt(query['labelNo'])
        let imgLocation = null
        try {
            let isImageRecordCreated = await models.Image.findOne({where: {
                projectId: query['projectId'],
                labelNo: query['labelNo'],
            }})
            if (!isImageRecordCreated) throw('projectId or labelNo not found')
            let ret = await models.Project.findById(query['projectId'])
            imgLocation = path.join(ret.get('imgLocation'), String(query['labelNo']), query['imgname'])
        }
        catch (e) {
            return ctx.body = Ret(0, '', e)
        }
        if (!imgLocation || !fs.existsSync(imgLocation)) 
            return ctx.body = Ret(0, 'imgLocation not exist')
        const imgStr = fs.readFileSync(imgLocation).toString('base64')
        ctx.body = Ret(1, '', imgStr)
        await next()
    })

/*
GET /image/raw/list?projectId=1&&labelNo=1 # 获取该文件夹下文件列表
*/
router.get('/image/raw/list',
    middleware.validateQueryParam('projectId', 'labelNo'),
    async (ctx, next) => {
        const query = ctx.query
        query['projectId'] = parseInt(query['projectId'])
        query['labelNo'] = parseInt(query['labelNo'])
        try {
            let isImageRecordCreated = await models.Image.findOne({where: {
                projectId: query['projectId'],
                labelNo: query['labelNo'],
            }})
            if (!isImageRecordCreated) throw('projectId or labelNo not found')
            let ret = await models.Project.findById(query['projectId'])
            let imgLocation = path.join(ret.get('imgLocation'), String(query['labelNo']))
            if (!fs.existsSync(imgLocation)) throw(`${imgLocation} not exist`)
            let imgList = fs.readdirSync(imgLocation)
            ctx.body = Ret(1, '', imgList)
        }
        catch (e) {
            ctx.body = Ret(0, '', e)
        }
        await next()
    })

module.exports = router

