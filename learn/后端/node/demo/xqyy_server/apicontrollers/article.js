const mysql = require('../knex')

exports.one = async ctx => {
    let { cateid, cateindex, id } = ctx.request.query
    if (id) {
        // 根据 id 获取，指定文章
        let res = await mysql('article').select().where({ id, state: 'publish' })
        ctx.state.data = res
    } else if (cateid) {
        cateindex = cateindex ? cateindex : 0
        let res = await mysql('article').select().where({
            cateid, cateindex, state: 'publish'
        }).limit(1)
        ctx.state.data = res
    } else {
        ctx.state.data = []
    }
}

exports.list = async ctx => {
    let { cateid, cateindex, page, size } = ctx.request.query
    page = page ? page : 1
    size = size ? size : 20
    if (cateid) {
        cateindex = cateindex ? cateindex : 0
        let res = await mysql('article').select().where({
            cateid, cateindex, state: 'publish'
        }).limit(size).offset(size * (page - 1 ))
        ctx.state.data = res
    } else {
        let res = await mysql('article').select().where({state: 'publish'})
                    .limit(size).offset(size * (page - 1 ))
        ctx.state.data = res
    }
}