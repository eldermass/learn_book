const app = require('http').createServer();
const io = require('socket.io')(app);

let PORT = 3000;
//客户端的计数
let clientCount = 0;
//用来存储客户端的socket
let socketMap = {};
app.listen(PORT)

//抽象成事件处理函数
function bindListener(socket,event){
    socket.on(event,function(data){
        if(socket.clientNum % 2 == 0){
            socketMap[socket.clientNum - 1].emit(event,data);
        }else{
            socketMap[socket.clientNum + 1].emit(event,data);
        }
    })
}


//建立连接时，收到的第一个信息
io.on('connection',function(socket){
    //连接人数
    clientCount = clientCount +1;
    socket.clientNum = clientCount;
    //把连接对象放入相应的连接 数中
    socketMap[clientCount] = socket;
    //当人数为奇数时，注册等待事件
    if(clientCount % 2 ==1){
        socket.emit('waiting','waiting for another player !')
    }else{
    //如果时偶数个时，就配对开始游戏
        socket.emit('start')
        socketMap[(clientCount - 1)].emit('start')
    }
    // //接收开始消息
    // socket.on('init',function(data){
    //     if(socket.clientNum % 2 == 0){
    //         socketMap[socket.clientNum - 1].emit('init',data);
    //     }else{
    //         socketMap[socket.clientNum + 1].emit('init',data);
    //     }
    // })
    bindListener(socket,'init')
    bindListener(socket,'next')
    bindListener(socket,'rotate')
    bindListener(socket,'right')
    bindListener(socket,'down')
    bindListener(socket,'left')
    bindListener(socket,'fall')
    bindListener(socket,'fixed')
    bindListener(socket,'line')
    // //接收下一个消息
    // socket.on('next',function(data){
    //     if(socket.clientNum % 2 == 0){
    //         socketMap[socket.clientNum - 1].emit('next',data);
    //     }else{
    //         socketMap[socket.clientNum + 1].emit('next',data);
    //     }
    // })
    //退出游戏时
    socket.on('disconnect',function(){

    })
})

console.log('websocket is listenning in port '+ PORT);