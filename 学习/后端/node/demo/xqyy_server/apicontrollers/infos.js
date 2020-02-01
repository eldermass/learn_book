const mysql = require('../knex')

exports.qrcode = async ctx => {
    let qrcode = await mysql('pureimage').select().where('imagetype', 'qrcode')
    if (qrcode.length) {
        ctx.state.data = qrcode[0]
    }
}
// 底部
exports.footer = async ctx => {
    let res = await mysql('footer').select().where({ id: 1 })
    let qrcode = await mysql('pureimage').select().where('imagetype', 'qrcode')

    if (res.length) {
        if (qrcode.length) {
            ctx.state.data = Object.assign({}, res[0], {
                qrcode: qrcode[0].imgUrl
            })
        } else {
            ctx.state.data = res[0]
        }
    }
}
// 联系我们
exports.contact = async ctx => {
    let res = await mysql('footer').select().where({ id: 2 })
    if (res.length) {
        ctx.state.data = res[0]
    }
}

exports.homedata = async ctx => {
    let res = {
        getSliderImg: [],
        getSection2Data: {
            describle: {
                title: '秀泉映月温泉花园酒店',
                sectitle: '国家珍惜氟泉（泉珍），锶泉',
                desc: '酒店园区内有温泉，温泉日流量3000多吨。温泉水温常年保持高达49.8℃，泉水内富含 氡、氟、锶、锌、锂等40多种矿物质，多项指标达到了有医疗价值热矿水标准， 命名为含偏硅酸、偏硼酸、镭、氟、锶医疗热矿水 ，对人体具有显著的养生、医疗 、美容、保健等功效。'
            },
            datas: [{
                title: '住宿',
                desc: '描述住宿',
                iconfont: 'icon-chuang',
                imgUrl: 'http://p0.qhimgs4.com/t011826e04beef0402c.jpg'
            }, {
                title: '餐饮',
                desc: '描述',
                iconfont: 'icon-meishi',
                imgUrl: 'http://pic42.photophoto.cn/20170202/1155115708717994_b.jpg'
            }, {
                title: '温泉',
                desc: '描述',
                iconfont: 'icon-wenquan',
                imgUrl: 'http://img1.cache.netease.com/catchpic/0/09/09D25E95F40661BD4F9F5A586B637254.jpg'
            }, {
                title: '火锅',
                desc: '描述',
                iconfont: 'icon-huoguo',
                imgUrl: 'http://images.3158.cn/data/attachment/tougao/article/2014/06/25/115e3b64975a387db246ee3cb8627f34.jpg'
            }]
        },
        getSection3Data: {
            maskBg: 'http://pic.vjshi.com/2018-08-15/fdaee094916e9e8923f6155f4569ab39/00001.jpg?x-oss-process=style/watermark',
            datas: [{
                title: '精品水质',
                desc: '国家珍惜氟泉（泉珍），锶泉国家珍惜氟泉（泉珍），锶泉国家珍惜氟泉（泉珍），锶泉',
                imgUrl: 'http://5b0988e595225.cdn.sohucs.com/images/20171202/f03c34fa941d4b69acd07f4d6af23a44.jpeg'
            }, {
                title: '原生态',
                desc: '食用蔬菜全部来自自建种植农产所生产的绿色蔬菜绿色蔬菜绿色蔬菜绿色蔬菜绿色蔬菜',
                imgUrl: 'http://www.guoshu.cn/file/upload/201802/27/1650196624909.jpg'
            }, {
                title: '卫生',
                desc: '客房每天都使用xx进行xx式的消毒客房每天都使用xx进行xx式的消毒用xx进行xx式的消毒...',
                imgUrl: 'http://q-cc.bstatic.com/images/hotel/max1024x768/870/87092386.jpg'
            }, {
                title: '热情',
                desc: '你将体会到回家一样的关照你将体会到回家一样的关照你将体会到回家将体会到回家一样的关照',
                imgUrl: 'https://i.loli.net/2019/01/14/5c3c2a7a7cfe3.png'
            }]
        },
        getSection4Data: {
            bg: 'https://i.loli.net/2019/01/13/5c3b35491e746.jpg',
            datas: [{
                title: '最美温泉',
                desc: '最美温泉描述',
                imgUrl: 'https://i.loli.net/2019/01/15/5c3de65b0d0d4.jpg'
            }, {
                title: '最美温泉',
                desc: '最美温泉描述',
                imgUrl: 'http://img3.tuniucdn.com/images/preferred/2014-03-18/2014-10-181395111501_l.jpg'
            }, {
                title: '最美温泉',
                desc: '最美温泉描述',
                imgUrl: 'http://photocdn.sohu.com/20151128/mp45080062_1448719519815_12.jpeg'
            }]
        },
        getSection5Data: [
            {
            id: 1,
            title: '最美2温泉',
            desc: '最美温泉描述',
            imgUrl: 'https://p.pstatp.com/weili/bl/55316146534091666.jpg',
            price: 122
        }, {
            id: 1,
            title: '最美温泉',
            desc: '最美温泉描述',
            imgUrl: 'https://p.pstatp.com/weili/bl/55316146534091666.jpg',
            price: 122
        }, {
            id: 1,
            title: '最美温泉',
            desc: '最美温泉描述',
            imgUrl: 'https://p.pstatp.com/weili/bl/55316146534091666.jpg',
            price: 122
        }, {
            id: 1,
            title: '最美温泉',
            desc: '最美温泉描述',
            imgUrl: 'https://p.pstatp.com/weili/bl/55316146534091666.jpg',
            price: 122
        }, {
            id: 1,
            title: '最美温泉',
            desc: '最美温泉描述',
            imgUrl: 'https://p.pstatp.com/weili/bl/55316146534091666.jpg',
            price: 122
        }, {
            id: 1,
            title: '最美温泉',
            desc: '最美温泉描述',
            imgUrl: 'https://p.pstatp.com/weili/bl/55316146534091666.jpg',
            price: 122
        }, {
            id: 1,
            title: '最美温泉',
            desc: '最美温泉描述',
            imgUrl: 'https://p.pstatp.com/weili/bl/55316146534091666.jpg',
            price: 122
        }, {
            id: 1,
            title: '最美温泉',
            desc: '最美温泉描述',
            imgUrl: 'https://p.pstatp.com/weili/bl/55316146534091666.jpg',
            price: 122
        }, {
            id: 1,
            title: '最美温泉',
            desc: '最美温泉描述',
            imgUrl: 'https://p.pstatp.com/weili/bl/55316146534091666.jpg',
            price: 122
        }]
        ,
        getSection6Data: {
            bg: 'https://i.loli.net/2019/01/13/5c3b35491e746.jpg',
            datas: [{
                title: '最美2温泉',
                desc: '最美温泉描述',
                imgUrl: 'http://demo.cssmoban.com/cssthemes5/twts_72_diner/img/img_2.jpg'
            }, {
                title: '最美2温泉',
                desc: '最美温泉描述',
                imgUrl: 'http://demo.cssmoban.com/cssthemes5/twts_72_diner/img/img_1.jpg'
            }, {
                title: '最美食物',
                desc: '最美温泉描述',
                imgUrl: 'http://91cycn.37cy.com/net91cycn/1804/18-04-10/201804101158144.jpg'
            }, {
                title: '最美2温泉',
                desc: '最美温泉描述',
                imgUrl: 'http://images.meishij.net/p/20080625/2c0cdab3a22c47ef860925c0faa9ef6e.jpg'
            }]
        },
        getSection7Data: {}
    }
    // 轮播图
    let sliders = await mysql('pureimage').select().where('imagetype', 'slider')
    let sliderImg = []
    sliders.forEach(item => {
        if (item.imgUrl) {
            sliderImg.push(item.imgUrl)
        }
    })
    res.getSliderImg = sliderImg
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

exports.background = async ctx => {
    let { title } = ctx.request.query
    if (title) {
        let res = await mysql('pureimage').select().where({ title, imagetype: 'level2bg'})
        if (res.length) {
            ctx.state.data = res[0]
        }
    }
}
exports.music = async ctx => {
    let res = await mysql('footer').select().where({ commit: 'music' })
    if (res.length) {
        ctx.state.data = res[0]
    }
}