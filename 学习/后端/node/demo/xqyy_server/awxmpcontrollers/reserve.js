const mockData = {
    titleCN: '温馨提示',
    titleEN: 'warm prompt',
    items: [
      {
        itemTT: '入离时间',
        itemTX: '入住时间：13:00以后 离店时间：12:30以前'
      },
      {
        itemTT: '儿童及加床政策',
        itemTX: '不接受18岁以下客人在无监护人陪同的情况下入住'
      },
      {
        itemTT: '宠物',
        itemTX: '餐厅、温泉内不可携带宠物'
      },
      {
        itemTT: '退订规则',
        itemTX: '提前24小时可免费取消'
      },
      {
        itemTT: '接送',
        itemTX: '24小时免费接送机'
      },
    ]
  }
module.exports = async ctx => {
    ctx.state = {
        data : mockData
    }
}