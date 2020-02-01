const mockData = {
    sliderImages: [
      'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1158606.jpg',
      'https://i.loli.net/2019/01/13/5c3b2b71eaca7.jpg',
      'https://i.loli.net/2019/01/13/5c3b2b71f3e57.jpg',
      'https://i.loli.net/2019/01/13/5c3b2b732d573.jpg'
    ],
    // 四个
    topIntro: [
      {
        groupid: 1,
        imgUrl: "http://419571.s81i.faiusr.com/2/101/AFEI880ZEAIYACCgkKrfBSiohMqGBjBkOGRAZQ.jpg",
        color: "#ffb150",
        title: "酒店客房"
      },
      {
        groupid: 2,
        imgUrl: "http://419571.s81i.faiusr.com/2/101/AFEI880ZEAIYACClkKrfBSiwtfCyBjBkOGRAZQ.jpg",
        color: "#fc6c37",
        title: "天然温泉"
      },
      {
        groupid: 3,
        imgUrl: "http://419571.s81i.faiusr.com/2/101/AFEI880ZEAIYACChkKrfBSiK27qlBzBkOGRAZQ.jpg",
        color: "#f64f5a",
        title: "特色美食"
      },
      {
        groupid: 4,
        imgUrl: "http://419571.s81i.faiusr.com/2/101/AFEI880ZEAIYACCjkKrfBSi31d_KATBkOGRAZQ.jpg",
        color: "#64b5f6",
        title: "娱乐休闲"
      }
    ],
    hotelIntro: [
      {
        id: 1,
        imgUrl: "http://46733.s81i.faiusr.com/2/107/AFEIje0CEAIYACC32NHVBSiQzLHKBTDKAjjcAUBr.jpg",
        title: "温泉花园",
        profile: "温泉酒店温泉酒店温泉酒店温泉酒店温泉酒店温泉酒店温泉酒店"
      },
      {
        id: 2,
        imgUrl: "http://46733.s81i.faiusr.com/2/107/AFEIje0CEAIYACCz2NHVBSi4qrGdATDKAjjcAUBr.jpg",
        title: "樱花",
        profile: "樱花盛开"
      },
      {
        id: 3,
        imgUrl: "http://46733.s81i.faiusr.com/2/107/AFEIje0CEAIYACDG2dHVBSj41c2_ATDKAjjcAUBr.jpg",
        title: "娱乐",
        profile: "热气球升空"
      },
      {
        id: 4,
        imgUrl: "http://46733.s81i.faiusr.com/2/107/AFEIje0CEAIYACCs2tHVBSjQwpvXBjDKAjjcAUBr.jpg",
        title: "伤风停",
        profile: "美丽自然风光"
      }
    ],
    selectedRoom: [
      {
        id: 5,
        imgUrl: "http://419571.s81i.faiusr.com/2/101/AFEI880ZEAIYACCAgqrfBSiQl_79AzDuBTiwBEBl.jpg",
        title: "滨江观景房"
      },
      {
        id: 6,
        imgUrl: "http://419571.s81i.faiusr.com/2/101/AFEI880ZEAIYACCCgqrfBSiG4vSABTDuBTiwBEBl.jpg",
        title: "精品套房"
      },
      {
        id: 7,
        imgUrl: "http://419571.s81i.faiusr.com/2/101/AFEI880ZEAIYACCFgqrfBSikk_3VBTDuBTiwBEBl.jpg",
        title: "豪华双人房"
      },
      {
        id: 8,
        imgUrl: "http://419571.s81i.faiusr.com/2/101/AFEI880ZEAIYACCMgqrfBSjajMe8AjDuBTiwBEBl.jpg",
        title: "总统套房"
      },
    ],
    recomFood: [
      {
        id: 9,
        imgUrl: "http://88875.s81i.faiusr.com/2/101/AFEIq7YFEAIYACC43qzWBSiAhftmMI4COMgBQGU.jpg",
        title: "北京烤鸭",
        profile: "中国驰名烤鸭"
      },
      {
        id: 10,
        imgUrl: "http://88875.s81i.faiusr.com/2/101/AFEIq7YFEAIYACC83qzWBSihhfreATCOAjjIAUBl.jpg",
        title: "鱼子老婆饼",
        profile: "江苏名菜"
      },
      {
        id: 11,
        imgUrl: "http://88875.s81i.faiusr.com/2/101/AFEIq7YFEAIYACC_3qzWBSism_OJBTCOAjjIAUBl.jpg",
        title: "雪梨汤",
        profile: "广东老火炖汤"
      },
      {
        id: 12,
        imgUrl: "http://88875.s81i.faiusr.com/2/101/AFEIq7YFEAIYACCg4qzWBSiIjPilBDDKAjjcAUBl.jpg",
        title: "烟熏香肠",
        profile: "德国主食"
      },
      {
        id: 13,
        imgUrl: "http://88875.s81i.faiusr.com/2/101/AFEIq7YFEAIYACCi4qzWBSigu5W0BjDKAjjcAUBl.jpg",
        title: "蒜苗番茄奥利奥",
        profile: "法国知名甜品"
      },
      {
        id: 14,
        imgUrl: "http://88875.s81i.faiusr.com/2/101/AFEIq7YFEAIYACCc4qzWBSjm95nyBzDKAjjcAUBl.jpg",
        title: "罗宋汤",
        profile: "俄罗斯高汤"
      },
      {
        id: 15,
        imgUrl: "http://88875.s81i.faiusr.com/2/101/AFEIq7YFEAIYACCe4qzWBSiUmpyxBDDKAjjcAUBl.jpg",
        title: "柠檬香煎鳕鱼排",
        profile: "美丽自然风光"
      }
    ]
  }

module.exports = async ctx => {
    ctx.state = {
        data: mockData
    }
}
