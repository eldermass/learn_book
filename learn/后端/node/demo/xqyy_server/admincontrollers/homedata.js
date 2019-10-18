const mysql = require('../knex')

exports.get = async ctx => {
    let res = {}
    // 轮播图
    let sliders = await mysql('pureimage').select().where('imagetype', 'slider')
    res.getSliderImg = sliders
    // section2
    let section2 = await mysql('homedata').select().where('displayto', 'section2').orderBy('id')
    if (section2.length) {
        res.getSection2Data = {
            describle: section2[0],
            datas: [section2[1], section2[2], section2[3], section2[4]]
        }
    }
    // section3
    let section3bg = await mysql('pureimage').select().where({title: 'section3', imagetype: 'other'})
    let section3 = await mysql('homedata').select().where('displayto', 'section3').orderBy('id')
    if (section3.length) {
        res.getSection3Data = {
            maskBg : section3bg[0].imgUrl,
            datas: section3
        }
    }
    // section4
    let section4bg = await mysql('pureimage').select().where({title: 'section4', imagetype: 'other'})
    let section4 = await mysql('homedata').select().where('displayto', 'section4').orderBy('id')
    if (section4.length) {
        res.getSection4Data = {
            bg : section4bg[0].imgUrl,
            datas: section4
        }
    }
    // section5
    let section5 = await mysql('homedata').select().where('displayto', 'section5').orderBy('id')
    if (section5.length) {
        res.getSection5Data = section5
    }
    // section6
    let section6bg = await mysql('pureimage').select().where({title: 'section6', imagetype: 'other'})
    let section6 = await mysql('homedata').select().where('displayto', 'section6').orderBy('id')
    if (section6.length) {
        res.getSection6Data = {
            bg : section6bg[0].imgUrl,
            datas: section6
        }
    }
    // section7
    let section7 = await mysql('homedata').select().where('displayto', 'section7')
    if (section7.length) {
        res.getSection7Data = section7[0]
    }

    ctx.state.data = res
}
exports.post = async ctx => {
    let { id, item } = ctx.request.body
    if (id) {
        let res = await mysql('homedata').update(item).where({ id })
        if (res) {
            ctx.state.data = true
        } else {
            ctx.state.data = false
        }
    }
}

exports.postslider = async ctx => {
    let { id, imgUrl } = ctx.request.body
    if (id && imgUrl) {
        let res = await mysql('pureimage').update({
            imgUrl
        }).where({ id })
        if (res) {
            ctx.state.data = true
        } else {
            ctx.state.data = false
        }
    }
    if (!id && imgUrl) {
        let res = await mysql('pureimage').insert({
            imgUrl, imagetype: 'slider'
        })
        if (res) {
            ctx.state.data = true
        } else {
            ctx.state.data = false
        }
    }
    if (!imgUrl && id) {
        let res = await mysql('pureimage').delete().where({ id })
        if (res) {
            ctx.state.data = true
        } else {
            ctx.state.data = false
        }
    }
}

exports.secbg = async ctx => {
    let { item, section } = ctx.request.body
    if (item && section) {
        let res = await mysql('pureimage').update({ imgUrl: item }).where({ title: section })
        if (res) {
            ctx.state.data = true
        } else {
            ctx.state.code = -1
        }
    }
}

exports.getfooter = async ctx => {
    let res = await mysql('footer').select().where({id: 1})
    if (res.length) {
        ctx.state.data = res[0]
    }
}

exports.postfooter = async ctx => {
    let { item } = ctx.request.body
    if (item.id) {
        let res = await mysql('footer').update(item).where({ id: item.id })
        if (res) {
            ctx.state.data = true
        } else {
            ctx.state.code = -1
        }
    }
    
}

exports.getqrcode = async ctx => {
    let res = await mysql('pureimage').select().where({ imagetype: 'qrcode' })
    if (res.length) {
        ctx.state.data = res[0]
    }
}
exports.postqrcode = async ctx => {
    let { item } = ctx.request.body
    if (item.id) {
        let res = await mysql('pureimage').update(item).where({ id: item.id })
        if (res) {
            ctx.state.data = true
        } else {
            ctx.state.code = -1
        }
    }
}

exports.getmusic = async ctx => {
    let res = await mysql('footer').select().where({ commit: 'music' })
    if (res.length) {
        ctx.state.data = res[0]
    }
}
exports.postmusic = async ctx => {
    let { item } = ctx.request.body
    if (item.id) {
        let res = await mysql('footer').update(item).where({ id: item.id })
        if (res) {
            ctx.state.data = true
        } else {
            ctx.state.code = -1
        }
    }
}

exports.getcontact = async ctx => {
    let res = await mysql('footer').select().where({ commit: 'contact' })
    if (res.length) {
        ctx.state.data = res[0]
    }
}
exports.postcontact = async ctx => {
    let { item } = ctx.request.body
    if (item.id) {
        let res = await mysql('footer').update(item).where({ id: item.id })
        if (res) {
            ctx.state.data = true
        } else {
            ctx.state.code = -1
        }
    }
}
exports.getbackground = async ctx => {
    let res = await mysql('pureimage').select().where({ imagetype: 'level2bg' })
    if (res.length) {
        ctx.state.data = res
    }
}
exports.postbackground = async ctx => {
    let { item } = ctx.request.body
    if (item.id) {
        let res = await mysql('pureimage').update(item).where({ id: item.id })
        if (res) {
            ctx.state.data = true
        } else {
            ctx.state.code = -1
        }
    }
}