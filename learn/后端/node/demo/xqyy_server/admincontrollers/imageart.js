const mysql = require('../knex')
const handleAction = require('./action').handleAction

exports.list = async ctx => {
    let { cateid } = ctx.request.query
    if (ctx.request.access == 'super_admin' || ctx.request.access == 'admin') {
        // 管理员能管理所有人的文章
        let sql = mysql('image').select('image.*', 'user.nickname as editor')
                    .leftJoin('user','image.editor_id','user.user_id')
        if (cateid) {
            let res = await sql.where({cateid})
            ctx.state.data = res
        } else {
            let res = await sql
            ctx.state.data = res
        }
    } else if (ctx.request.user_id) {
        // 管理自己的文章
        let sql = mysql('image').select('image.*', 'user.nickname as editor')
        .leftJoin('user','image.editor_id','user.user_id').where('user.user_id', ctx.request.user_id)
        if (cateid) {
            let res = await sql.where({cateid})
            ctx.state.data = res
        } else {
            let res = await sql
            ctx.state.data = res
        }
    } else {
        ctx.state.data = []
    }
}

exports.one = async ctx => {
    let { id } = ctx.request.query
    if (id) {
        let res = await mysql('image').select('image.*', 'user.nickname as editor')
                .leftJoin('user','image.editor_id','user.user_id').where({id})
        if (res.length) {
            ctx.state.data = Object.assign(res[0], {
                imgUrls: JSON.parse(res[0].imgUrls)
            })
        } else {
            ctx.state = {
                code: -1,
                data: '没有找到数据'
            }
        }
    } else {
        ctx.state = {
            code: -1,
            data: '参数不合理'
        }
    }
}

exports.delete = async ctx => {
    let { id } = ctx.request.query
    if (id && ctx.request.access == 'super_admin') {
        let res = await mysql('image').delete().where({id})
        if (res) {
            ctx.state.data = '删除成功'
        } else {
            ctx.state = {
                code: -1,
                data: '删除失败'
            }
        }
    } else {
        ctx.state = {
            code: -1,
            data: '权限不足，删除失败'
        }
    }
}
//
exports.submit = async ctx => {
    // 有id是改，没id是加
    let { id, imagedatas } = ctx.request.body
    let insertValue = {
        title: imagedatas.title,
        profile: imagedatas.profile,
        content: imagedatas.content,
        state: imagedatas.state,
        cateid: imagedatas.cateid,
        cateindex: imagedatas.cateindex,
        create_time: imagedatas.create_time,
        imgUrls: JSON.stringify(imagedatas.imgUrls),        
        imgcate: imagedatas.imgcate,
        editor_id: imagedatas.editor_id,
        price: imagedatas.price ? imagedatas.price : 0
    }
    // console.log(imagedatas)
    // console.log(insertValue)
    handleAction(imagedatas.editor_id, imagedatas.editor, `修改了图片:${imagedatas.title}`)
    if (ctx.request.access == 'super_admin') {
        if (id) {
            let res = await mysql('image').update(insertValue).where({id})
            if (res) {
                ctx.state.data = '修改图文成功'
            }
        } else {
            let res = await mysql('image').insert(insertValue)
            if (res) {
                ctx.state.data = '修改图文成功'
            }
        }
    } else if (ctx.request.access == 'admin' && insertValue.state !== 'publish') {
        if (insertValue.editor_id !== ctx.request.user_id) {
            ctx.state=  {
                code: -1,
                data: '没有权限修改别人的文章'
            }
            return
        }
        if (id) {
            let res = await mysql('image').update(insertValue).where({id})
            if (res) {
                ctx.state.data = '修改图文成功'
            }
        } else {
            let res = await mysql('image').insert(insertValue)
            if (res) {
                ctx.state.data = '修改图文成功'
            }
        }
    } else if (ctx.request.access == 'normal_user' && insertValue.state == 'trash') {
        if (id) {
            let res = await mysql('image').update(insertValue).where({id})
            if (res) {
                ctx.state.data = '修改图文成功'
            }
        } else {
            let res = await mysql('image').insert(insertValue)
            if (res) {
                ctx.state.data = '添加图文成功'
            }
        }
    } else if (!id && insertValue.state !== 'publish') {
        let res = await mysql('image').insert(insertValue)
        if (res) {
            ctx.state.data = '添加图文成功'
        }
    } else {
        ctx.state = {
            code: -1,
            data: '权限不够，添加或修改图文失败'
        }
    }
}