const mockDatas = [
    {
      id: 1,
      title: '火锅',
      imgUrl: 'http://5b0988e595225.cdn.sohucs.com/images/20171218/2a571dc7dc9344ebb8c468f5c89d26cd.jpeg'
    },
    {
      id: 2,
      title: '中餐',
      imgUrl: 'http://419135.s81i.faiusr.com/2/101/AFEIv8oZEAIYACCf5o3jBSiApsDvBjDuBTjoAkBl.jpg'
    },
    {
      id: 3,
      title: '饮品',
      imgUrl: 'http://139666.s81i.faiusr.com/4/101/AFEIksMIEAQYACC2oMvXBSig9oGMAzCyBTiEA0Bl.png'
    },
  ]
const mockMenus = require('./mockdata/menus')

exports.menus = async ctx => {
    ctx.state = {
        data: mockDatas
    }
}
exports.menu = async ctx => {
    let { menuid } = ctx.request.query
    // console.log(menuid)
    ctx.state = {
        data : mockMenus[menuid]
    }
}
