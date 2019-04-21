const Koa = require('koa')
const Router = require('koa-router')()
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
// handle 是用来加载next框架打包,或者工具资源的,如_next下的文件
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa();
  
  Router.get('*', async ctx => {
    const { req, res } = ctx
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    // console.log(req.url, query)

    // 我可以再这里添加一个值,传到react中
    req.msg = 'message from server'

    if (pathname.match(/^\/[^_]/)) {
      // 这是一个异步渲染的过程
      await app.render(req, res, pathname, query) // query是一个对象
    } else {
      // 返回如_next下的文件
      await handle(req, res, parsedUrl)
    }
  })

  server.use(Router.routes())
  server.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})