let groupid = 1
const mockData = [
    {
      id: 1,
      imgUrl: "http://419571.s81i.faiusr.com/2/101/AFEI880ZEAIYACCAgqrfBSiQl_79AzDuBTiwBEBl.jpg",
      title: "图1，分类id-" + groupid
    },
    {
      id: 2,
      imgUrl: "http://419571.s81i.faiusr.com/2/101/AFEI880ZEAIYACCCgqrfBSiG4vSABTDuBTiwBEBl.jpg",
      title: "图2，分类id-" + groupid
    },
    {
      id: 3,
      imgUrl: "http://419571.s81i.faiusr.com/2/101/AFEI880ZEAIYACCFgqrfBSikk_3VBTDuBTiwBEBl.jpg",
      title: "图3，分类id-" + groupid
    },
    {
      id: 4,
      imgUrl: "http://419571.s81i.faiusr.com/2/101/AFEI880ZEAIYACCMgqrfBSjajMe8AjDuBTiwBEBl.jpg",
      title: "图4，分类id-" + groupid
    }
  ]
module.exports = async ctx => {
    let { groupid } = ctx.request.query
    // console.log(groupid)
    ctx.state = {
        data : mockData
    }
}