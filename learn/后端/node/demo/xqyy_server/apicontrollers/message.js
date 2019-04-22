const mysql = require('../knex')
module.exports = async ctx => {
    let { name, telphone, title, describle } = ctx.request.body
    if ( name && title && describle ) {
        let res = await mysql('message').insert({
            title: '客户留言',
            create_time: new Date().getTime(),
            content: `名为：${name}, 电话为：${telphone}。<br/>提出了建议：${title} 。<br/> ${describle}`,
            forall: 'super_admin'
        })
        ctx.state.data = 'ok了'
    } else {
        ctx.state.data = '信息不完整'
    }
}