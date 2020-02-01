const mysql = require('../knex')

exports.unreadcount = async ctx => {
    let { user_id } = ctx.request.query
    if (user_id) {
        let allmsg
        let sql = mysql('message')
        if (ctx.request.access == 'super_admin') {
            allmsg = await sql.select().whereIn('forall', ['super_admin', 'admin', 'normal_user'])
                        .orWhere({get_user_id: user_id})
        } else if (ctx.request.access == 'admin') {
            allmsg = await sql.select().whereIn('forall', ['admin', 'normal_user'])
                        .orWhere({get_user_id: user_id})
        } else if (ctx.request.access == 'normal_user') {
            allmsg = await sql.select().whereIn('forall', ['normal_user'])
                        .orWhere({get_user_id: user_id})
        } else {
            allmsg = await sql.select().orWhere({get_user_id: user_id})
        }
        if (allmsg.length) {
            ctx.state.data = allmsg.filter(item => item.state == 'unread').length
        } else {
            ctx.state.data = 0
        }
    } else {
    }
}

exports.messagelist = async ctx => {
    let { user_id } = ctx.request.query
    if (user_id) {
        let allmsg
        let sql = mysql('message')
        // console.log( await sql)
        if (ctx.request.access == 'super_admin') {
            allmsg = await sql.select().whereIn('forall', ['super_admin', 'admin', 'normal_user'])
                        .orWhere({get_user_id: user_id})
        } else if (ctx.request.access == 'admin') {
            allmsg = await sql.select().whereIn('forall', ['admin', 'normal_user'])
                        .orWhere({get_user_id: user_id})
        } else if (ctx.request.access == 'normal_user') {
            allmsg = await sql.select().where('forall', 'normal_user')
                        .orWhere({get_user_id: user_id})
        } else {
            allmsg = await sql.select().orWhere({get_user_id: user_id})
        }
        // console.log(allmsg)
        if (allmsg) {
            let unread = allmsg.filter(item => item.state == 'unread')
            let readed = allmsg.filter(item => item.state == 'readed')
            let trash = allmsg.filter(item => item.state == 'trash')
            ctx.state.data = {
                unread, readed, trash
            }
        } else {
            ctx.state.data = {
                unread: [],
                readed: [],
                trash: []
            }
        }
    } else {
        ctx.state.data = {
            unread: [],
            readed: [],
            trash: []
        }
    }
}

exports.messagecontent = async ctx => {
    let { msg_id } = ctx.request.query
    if (msg_id) {
        let msg = await mysql('message').select().where({msg_id})
        // console.log(msg)
        if (msg.length)
        ctx.state.data = msg[0].content
    } else {
        ctx.state.data = ``
    }
}

exports.hasread = async ctx => {
    // 处理阅读事件
    let { msg_id } = ctx.request.query
    if (msg_id) {
        let res = await mysql('message').update({state: 'readed'}).where({msg_id})
        if (res) {
            ctx.state.data = true
        }
    } else {
        ctx.state.data = false
    }
}

exports.removereaded = async ctx => {
    // 处理将已读移动到垃圾桶
    let { msg_id } = ctx.request.query
    if (msg_id) {
        let res = await mysql('message').update({state: 'trash'}).where({msg_id})
        if (res) {
            ctx.state.data = true
        }
    } else {
        ctx.state.data = false
    }
}

exports.restoretrash = async ctx => {
    // 处理将已读移动到垃圾桶
    let { msg_id } = ctx.request.query
    if (msg_id) {
        let res = await mysql('message').update({state: 'readed'}).where({msg_id})
        if (res) {
            ctx.state.data = true
        }
    } else {
        ctx.state.data = false
    }
}

exports.deletemsg = async ctx => {
    let { msg_id } = ctx.request.query
    // 有msg_id， 只删除某一篇
    // return

    if (msg_id) {
        let res = await mysql('message').delete().where({msg_id})
        if (res) {
            ctx.state.data = true
        }
    } else if (ctx.request.user_id) {
        let res = await mysql('message').delete().where({get_user_id: ctx.request.user_id})
                    .andWhere({state: 'trash'})
                    
        if (ctx.request.access = 'super_admin') {
            await mysql('message').delete().whereIn('forall', ['super_admin', 'admin', 'normal_user'])
                .andWhere({state: 'trash'})
        }
        ctx.state.data = true
    
    } else {
        ctx.state.data = false
    }
}