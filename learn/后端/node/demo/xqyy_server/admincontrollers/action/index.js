const mysql = require('../../knex')

exports.handleAction = async function ( id, who, what) {
    let date = new Date()
    let res = await mysql('message').insert({
        title: '系统消息',
        create_time: date.getTime(),
        content: `${date.toLocaleString()}: 用户id为${id}的${who} ${what}`,
        forall: 'super_admin'
    })
    // console.log(who, what, id, res)
}