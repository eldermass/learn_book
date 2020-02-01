let imageid = 1
const mockData = {
    title: '详情id- ' + imageid,
    profile: '<p>阿布扎比汇聚了种类繁多的各式风情岛屿，为游客娱乐、文化、奢侈品、原生态的海滩、野生动物保护区和锦标赛级别的高尔夫球设施。</p><p>在阿布扎比感受真正的海洋魅力！在波光粼粼的碧蓝海水里游泳，在迷人的白色沙滩上休憩，领略延续数个世纪的航海传统。您可以体验海上滑水或风筝冲浪；搭乘传统采珍珠船或现代豪华单桅船前往天然红树林；享受双体船上的新鲜空气，或者加快节奏，乘坐快艇游览阿联酋首都的海岸线——阿布扎比的精彩水域等您来探索。</p>',
    imgUrls: [
      {
        imgUrl: 'http://46733.s81i.faiusr.com/2/107/AFEIje0CEAIYACC32NHVBSiQzLHKBTDKAjjcAUBr.jpg',
        title: '露天游泳池'
      },
      {
        imgUrl: 'http://46733.s81i.faiusr.com/2/107/AFEIje0CEAIYACCz2NHVBSi4qrGdATDKAjjcAUBr.jpg',
        title: '樱花林'
      },
      {
        imgUrl: 'http://46733.s81i.faiusr.com/2/107/AFEIje0CEAIYACDG2dHVBSj41c2_ATDKAjjcAUBr.jpg',
        title: '热气球'
      },
      {
        imgUrl: 'http://46733.s81i.faiusr.com/2/107/AFEIje0CEAIYACCs2tHVBSjQwpvXBjDKAjjcAUBr.jpg',
        title: '忘川亭'
      },
      {
        imgUrl: 'http://444747.s81i.faiusr.com/2/101/AFEIy5IbEAIYACDcwqPfBSj_2bS6BTDuBTiwBEBl.jpg',
        title: '神柱'
      },
      {
        imgUrl: 'http://444747.s81i.faiusr.com/4/101/AFEIy5IbEAQYACDRqqTfBSiky9j0AjDeATjIAUBl.png',
        title: '夕阳'
      },
      {
        imgUrl: 'http://444747.s81i.faiusr.com/4/101/AFEIy5IbEAQYACC6qqTfBSjbs5TABjDeATjIAUBl.png',
        title: '戏水'
      },
    ],
    price: 255
  }
module.exports = async ctx => {
    let { imageid } = ctx.request.query
    // console.log(ctx.request.query)
    ctx.state = {
        data: mockData
    }
}