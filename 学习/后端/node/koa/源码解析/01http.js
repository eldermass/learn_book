const http = require('http')

let server = http.createServer((req,res)=>{
    res.writeHead(200)
    res.end('hello node')
})

server.listen(8080,()=>{
    console.log('server is listen in port 8080')
})