const http = require('http')

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
        this.midddlwares = []
    }
    use(callback){
        this.midddlwares.push(callback)
    }
    listen(...args){
        let server = http.createServer(async (req, res) => {
            let ctx = this.createCtx(req, res)    
            let fn = this.compose(this.midddlwares)
            await fn(ctx)
            ctx.res.end(ctx.body)
        })
        server.listen(...args)
    }
    createCtx(req, res){
        let ctx = Object.create(context)
        ctx.request  = Object.create(request)
        ctx.response = Object.create(response)
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
    compose(mids){
        return function (context){
            return dispatch(0)
            function dispatch(i){
                let fn = mids[i]
                if(!fn){
                    return Promise.resolve()
                }
                return Promise.resolve(fn(context, function(){
                    return dispatch(i + 1)
                }))
            }
        }
    }
}

let server = new Application()
server.listen(8080, () => {
    console.log('8080')
})

server.use(async (ctx, next) => {
    ctx.body = 'aaa'
    await next()
    ctx.body += 'ccc'
})
server.use(async ctx => {
    let b = await (function (){
        setTimeout(function () {
            return Promise.resolve('bbb')
        },2000)
    })()
    ctx.body += 'bbb'
})