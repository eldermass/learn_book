function bindEvent (IO) {
    IO.on('connection', socket => {
        console.log('a user in')
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
        socket.on('chat message', msg => {
            console.log('收到' + msg)
        })
    })
}

module.exports = bindEvent