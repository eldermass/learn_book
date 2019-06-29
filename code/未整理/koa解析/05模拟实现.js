const http = require('http')
//利用set get 响应式操作
let request = {
    get url(){
        return this.req.url
    }
}
let response = {
    get body(){
        return this._body
    },
    set body(val){
        this._body = val
    }
}
//挂载到 context上
let context = {
    get url(){
        return this.request.url
    },
    get body(){
        return this.response.body
    },
    set body(val){
        this.response.body = val
    }
}

class Application{
    constructor(){
        this.context = context
        this.response = response
        this.request = request
        this.midddlwares = []
    }
    use(callback){
        // this.callback = callback
        this.midddlwares.push(callback)
    }
    listen(...args){
        let server = http.createServer(async (req, res) => {
            //构造ctx
            let ctx  = this.createCtx(req, res)
            // 整合中间件
            let fn = this.compose(this.midddlwares)
            await fn(ctx)
            ctx.res.end(ctx.body)
        })
        server.listen(...args)
    }
    createCtx(req, res){
        //挂载操作
        let ctx = Object.create(this.context)
        ctx.request = Object.create(this.request)
        ctx.response = Object.create(this.response)
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
    compose(midddlware){
        return function(context){
            return dispatch(0)
            function dispatch(i){
                let fn = midddlware[i]
                if(!fn){
                    return Promise.resolve()
                }
                //每个中间件给两个参数  ctx 和 next
                return Promise.resolve(fn(context, function next(){
                    return dispatch(i + 1)
                }))
            }
        }
    }
}

//使用
let ser = new Application()
ser.use(async (ctx, next) => {
    ctx.body = '1'
    await next()
    ctx.body += '1 end'
})

ser.use(async (ctx, next) => {
    ctx.body += '2'
    let res = await delay()
    ctx.body += ` - ${res} -`
    ctx.body += '2 end'
})



ser.listen(8080,()=>{
    console.log('server listen in 8080')
})
function delay(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('yes')
        },2000)
    })
}