const mysql = require('../knex')
const jwt = require('../tools/jwt')
const tools = require('../tools/tools')

exports.login = async ctx => {
    let token
    let { userName, password } = ctx.request.body
    let res = await mysql('user').select().where({username: userName})
    if (res.length) {
        if (res[0].password == tools.md5(password)) {
            delete res[0].password
            token = jwt.sign(res)
            ctx.state.data = {
                token: token
            }
        } else {
            ctx.state = {
                code: -1,
                data: {
                    msg: '密码错误'
                }
            }
        }
    } else {
        ctx.state = {
            code: -1,
            data: {
                msg: '账号不存在'
            }
        }
    }
}

exports.userinfo = async ctx => {
    let {token, user_id} = ctx.request.query
    // console.log(token, user_id, ctx.request.userinfo)
    // 获取自己的用户信息
    if (ctx.request.user_id == user_id || (ctx.request.user_id && !user_id)) {
        let userinfo = ctx.request.userinfo
        if (userinfo) {
            ctx.state.data = Object.assign(userinfo, {
                token: token
            })
        }
    } else {
    // 获取别人的用户信息
        if (ctx.request.access === 'super_admin' || ctx.request.access === 'admin') {
            let userinfo = await mysql('user').select().where({user_id})
            if (userinfo.length) {
                ctx.state.data = Object.assign(userinfo[0], {
                    password: '不可见'
                })
            }
        } else {
            ctx.state.data = '非法获取用户信息'
        }
    }
}

exports.logout = async ctx => {
    // let {token} = ctx.request.query
    // console.log('注销用户')
    ctx.state.data = {
        msg: 'logout successful'
    }
}

exports.users = async ctx => {
    let users = await mysql('user').select()
    let resdata
    if (ctx.request.access === 'super_admin') {
        resdata = users.map(item => {
            return Object.assign(item, {
                password: '不可见',
                access: JSON.parse(item.access)
            })
        }).filter(item => {
            return item.auth !== 'super_admin' || item.user_id === ctx.request.user_id
        })
    } else if (ctx.request.access === 'admin') {
        resdata = users.map(item => {
            return Object.assign(item, {
                password: '不可见',
                access: JSON.parse(item.access)
            })
        }).filter(item => {
            return (item.auth !== 'super_admin' && item.auth !== 'admin')
                    || item.user_id === ctx.request.user_id
        })
    } else {
        resdata = users.map(item => {
            return Object.assign(item, {
                password: '不可见',
                access: JSON.parse(item.access)
            })
        }).filter(item => {
            return item.user_id === ctx.request.user_id
        })
    }
    ctx.state.data = resdata ? resdata : []
}

exports.usermodify = async ctx => {
    let { token, user_id, userinfo } = ctx.request.body
    if (token) {
        let { newpassword, newmanagetype } = userinfo
        let newuserinfo = {
            nickname: userinfo.nickname,
            avator: userinfo.avator,
            email: userinfo.email,
            tel: userinfo.tel,
            describle: userinfo.describle,
        }
        if (newpassword) {
            newuserinfo.password = tools.md5(newpassword)
        }
        if (newmanagetype) {
            newuserinfo.access = getAccessFromType(newmanagetype)
            newuserinfo.auth = userinfo.newmanagetype
        }
        // 处理新密码和新类型

        // console.log(newuserinfo)
        if (ctx.request.user_id === user_id) {
            // 登录者和修改是同一个人
            let res = await mysql('user').update({...newuserinfo}).where({user_id}).catch((err) => {
                console.log(err)
                ctx.state = {
                    code: -1,
                    data: '输入信息有误'
                }
            })
            if ( res ) {
                ctx.state.data = '修改成功'
            }
        } else if (ctx.request.access == 'super_admin' && !tools.hasInArray(JSON.parse(newuserinfo.access), 'super_admin')) {
            // 是 且 不都是 超级管理员
            let res = await mysql('user').update({...newuserinfo}).where({user_id}).catch(() => {
                ctx.state = {
                    code: -1,
                    data: '输入信息有误'
                }
            })
            if ( res ) {
                ctx.state.data = '修改成功'
            }
        } else if (ctx.request.access == 'admin' && tools.hasInArray(JSON.parse(newuserinfo.access), 'normal_user')) {
            // 操作者是管理员 被操作者是普通用户
            let res = await mysql('user').update({...newuserinfo}).where({user_id}).catch(() => {
                ctx.state = {
                    code: -1,
                    data: '输入信息有误'
                }
            })
            if ( res ) {
                ctx.state.data = '修改成功'
            }
        } else {
            ctx.state = {
                code: -1,
                data: '权限不够'
            }
        }
        
    }
}

exports.userdelete = async ctx => {
    let { user_id } = ctx.request.body
    if (ctx.request.access == 'super_admin' && user_id) {
        let res = await mysql('user').delete().whereNot({access: getAccessFromType('super_admin')})
                        .andWhere({user_id})
        if (res) {
            ctx.state.data = '用户删除成功'
        } else {
            ctx.state = {
                code: -1,
                data: '不可删除自己，删除用户失败'
            }
        }
    }  else {
        ctx.state = {
            code: -1,
            data: '权限不足，删除用户失败'
        }
    }
}

exports.register = async ctx => {
    let { token, userinfo } = ctx.request.body

    let { newpassword, newmanagetype } = userinfo
    if (newpassword) {
        userinfo.password = tools.md5(newpassword)
    }
    userinfo.access = getAccessFromType(newmanagetype)
    let user_info = {
        username: userinfo.username,
        name: userinfo.name,
        nickname: userinfo.nickname,
        password: userinfo.password,
        access: userinfo.access,
        avator: userinfo.avator,
        create_time: userinfo.create_time,
        tel: userinfo.tel,
        email: userinfo.email,
        describle: userinfo.describle,
        auth: newmanagetype
    }
    let access = ctx.request.access
    // console.log(user_info)
    if (access == 'super_admin' && !tools.hasInArray(JSON.parse(userinfo.access), 'super_admin')) {
        // 操作者是超级管理员  被操作者不是超级管理员
        let res = await mysql('user').insert(Object.assign({}, user_info)).catch(() => {
            ctx.state = {
                code: -1,
                data: '输入信息有误'
            }
        })
        if ( res ) {
            ctx.state.data = '注册成功'
        }
    } else if (access == 'admin' && tools.hasInArray(JSON.parse(userinfo.access), 'normal_user')) {
        // 操作者是管理员 被操作者是普通用户
        let res = await mysql('user').insert(Object.assign({}, user_info)).catch(() => {
            ctx.state = {
                code: -1,
                data: '输入信息有误'
            }
        })
        if ( res ) {
            ctx.state.data = '注册成功'
        }
    } else {
        ctx.state = {
            code: -1,
            data: '权限不够'
        }
    }
}

function getAccessFromType (type) {
    let typeMaps = {
        normal_user: '["normal_user"]',
        admin: '["admin","normal_user"]',
        super_admin: '["super_admin","admin","normal_user"]'
    }
    return typeMaps[type]
}