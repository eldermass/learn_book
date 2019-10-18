// const Koa = require('koa')
// const Router = require('koa-router')
import * as Koa from 'koa'
import * as Router from 'koa-router'
import Hello from './say'

const app = new Koa()
const router = new Router()

console.log(process.env.PORT, process.env.NODE_ENV)
router.get('/*', async (ctx) => {
  ctx.body = 'Hellow World !' + Hello(1, 1)
})

app.use(router.routes())

app.listen(3000)

console.log('Server is runing !!')
