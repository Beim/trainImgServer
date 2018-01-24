const router = require('koa-router')()

router.get('/test', async (ctx, next) => {
    ctx.body = 'test'
    await next()
})

module.exports = router

