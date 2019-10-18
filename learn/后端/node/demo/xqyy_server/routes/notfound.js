const router = require('koa-router')()
const tools = require('../tools/tools')

let adminPath = [
    '/login',
    '/home',
    '/message/:message',
    '/user/:user',
    '/article/:article',
    '/image/:image',
    '/homedata/:homedata'
]
router.get(adminPath, async ctx => {
    let res = await tools.readFile('./www/admin/index.html')
    if (res) {
        ctx.type = 'html'
        ctx.body = res
    }
})
router.get('*', async ctx => {
    let res = await tools.readFile('./www/index.html')
    if (res) {
        ctx.type = 'html'
        ctx.body = res
    }
})

module.exports = router