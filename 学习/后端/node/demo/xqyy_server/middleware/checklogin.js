const tools = require('../tools/tools')
const jwt = require('../tools/jwt')

module.exports = async (ctx, next) => {
    let token = tools.getToken(ctx)
    if (token) {
        let data = await jwt.verify(token).catch(err => {
            if (err === 'jwt expired') {
                ctx.state = {
                    code: -2,
                    data: '登录过期'
                }
            } else {
                ctx.state = {
                    code: -1,
                    data: '验证失败'
                }
            }
        })
        if (data && data.data.length) {
            let access = data.data[0].auth
            let current_userid = data.data[0].user_id
            ctx.request.access = access // string
            ctx.request.user_id = current_userid // number
            ctx.request.userinfo = data.data[0] //object
            await next()
        }
    } else {
        ctx.state = {
            code: -1,
            data: '未登录'
        }
    }
}