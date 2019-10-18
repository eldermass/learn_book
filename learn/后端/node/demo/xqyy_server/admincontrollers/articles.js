const mysql = require('../knex')
const handleAction = require('./action').handleAction

exports.list = async ctx => {
    let { cateid } = ctx.request.query
    if (ctx.request.access == 'super_admin' || ctx.request.access == 'admin') {
        // 管理员能管理所有人的文章
        let sql = mysql('article').select('article.*','user.nickname as editor')
        .leftJoin('user','article.editor_id','user.user_id')
        if (cateid) {
            let res = await sql.where({cateid})
            ctx.state.data = res
        } else {
            let res = await sql
            ctx.state.data = res
        }
    } else if (ctx.request.user_id) {
        // 管理自己的文章
        let sql = mysql('article').select('article.*','user.nickname as editor')
        .leftJoin('user','article.editor_id','user.user_id').where('user.user_id', ctx.request.user_id)
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
        let res = await mysql('article').select('article.*','user.nickname as editor')
        .leftJoin('user','article.editor_id','user.user_id').where({id})
        if (res.length) {
            ctx.state.data = res[0]
        } else {
            res.state.code = -1
        }
    } else {
        res.state.code = -1
    }
}

exports.delete = async ctx => {
    let { id } = ctx.request.query
    if (id && ctx.request.access == 'super_admin') {
        let res = await mysql('article').delete().where({id})
        if (res) {
            ctx.state.data = '删除文章 -- ' + id + '成功'
        } else {
            tx.state = {
                code: -1,
                data: '删除文章失败'
            }
        }
    } else {
        ctx.state = {
            code: -1,
            data: '权限不足，删除文章失败'
        }
    }
}

exports.submit = async ctx => {
    // 有id是改，没id是加
    let { id, token, articleinfo } = ctx.request.body
    // console.log(articleinfo)
    let insertValue = {
        title: articleinfo.title,
        profile: articleinfo.profile,
        content: articleinfo.content,
        state: articleinfo.state,
        cateid: articleinfo.cateid ? articleinfo.cateid : 0,
        cateindex: articleinfo.cateindex,
        create_time: articleinfo.create_time,
        editor_id: articleinfo.editor_id
    }
    handleAction(articleinfo.editor_id, articleinfo.editor, `修改了文章:${articleinfo.title}`)
    if (ctx.request.access == 'super_admin') {
        if (id) {
            let res = await mysql('article').update(insertValue).where({id})
            if (res) {
                ctx.state.data = '修改文章成功'
            }
        } else {
            let res = await mysql('article').insert(insertValue)
            if (res) {
                ctx.state.data = '添加文章成功'
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
            let res = await mysql('article').update(insertValue).where({id})
            if (res) {
                ctx.state.data = '修改文章成功'
            }
        } else {
            let res = await mysql('article').insert(insertValue)
            if (res) {
                ctx.state.data = '添加文章成功'
            }
        }
    } else if (ctx.request.access == 'normal_user' && insertValue.state == 'trash') {
        if (id) {
            let res = await mysql('article').update(insertValue).where({id})
            if (res) {
                ctx.state.data = '修改文章成功'
            }
        } else {
            let res = await mysql('article').insert(insertValue)
            if (res) {
                ctx.state.data = '添加文章成功'
            }
        }
    } else if (!id && insertValue.state !== 'publish') {
        let res = await mysql('article').insert(insertValue)
        if (res) {
            ctx.state.data = '添加文章成功'
        }
    } else {
        ctx.state = {
            code: -1,
            data: '权限不够，添加或修改文章失败'
        }
    }
    
}
// toggle 发布状态