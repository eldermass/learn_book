const app = require('express')()
const http = require('http').Server(app)
const IO = require('socket.io')(http)
/**
 * socket服务器三步曲
 * 1. 创建框架app
 * 2. 原生http中使用框架
 * 3. 用socket.io监听原生http
 * 注： 本node服务应该由监听原生http进行
 *      而不是app
 *  */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')    
})

http.listen(8000, () => {
    console.log(`server is listen in port 8000`)
})

IO.on('connection', socket => {
    console.log('a user in')
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', msg => {
        console.log('收到' + msg)
    })
})