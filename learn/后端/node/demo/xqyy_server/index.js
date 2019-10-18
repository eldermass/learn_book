const Koa = require('koa')
let app = new Koa()
const http = require('http').createServer(app.callback())
const IO = require('socket.io')(http)

const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')
const koaStatic = require('koa-static')

// 监听端口
const PORT = 8020
http.listen(PORT, () => {
  console.log(`server is listen in port ${PORT}`)
})
// 定义socket事件
require('./socket')(IO)
// 跨域
app.use(cors({
  origin: function (ctx) {
    // console.log(ctx.request)
    return  ctx.request.header.origin
      // if (ctx.url === '/test') {
      //     return "*"; // 允许来自所有域名请求
      // }
      // return 'http://localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 60,
  credentials: true,
  // allowMethods: ['GET', 'POST', 'DELETE'],
  // allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
// 消息体
app.use(bodyparser())
// 引入自定义中间件
app.use(require('./middleware/response'))
// 设置静态文件
app.use(koaStatic('./www'))
app.use(koaStatic('./public/'))

// 分发路由
app.use(require('./routes/api').routes())
app.use(require('./routes/weapp').routes())
app.use(require('./routes/admin').routes())
// 匹配不到时返回 index.html 适配vue的history模式
app.use(require('./routes/notfound').routes())