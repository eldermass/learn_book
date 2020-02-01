const http = require('http')
//跟promise类似，用类把函数引用先储存起来
class Application{
    constructor(){
        this.callback = ()=>{}
    }
    use(callback){
        this.callback = callback
    }
    listen(...args){
        let server = http.createServer((req, res) => {
            this.callback(req, res)
        })
        server.listen(...args)
    }
}

//使用
let ser = new Application()
ser.use((req, res) => {
    res.end('hello')
})

ser.listen(8080,()=>{
    console.log('server listen in 8080')
})