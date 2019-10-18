const mysql = require('../knex')

exports.get = async ctx => {
    let res = await mysql('navigator').select()
    ctx.state.data = res
}