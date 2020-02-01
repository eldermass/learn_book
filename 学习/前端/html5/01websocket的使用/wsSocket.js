const ws = require('nodejs-websocket')
let port = 8081

let server = ws.createServer(function(con){
    console.log('new connection')
    con.on('text',function(str){
        console.log('received--'+str);
        con.sendText(str.toUpperCase()+'!!!')
    })
    con.on('close',function(code,reason){
        console.log("connenction closed"+code+reason);
    })
    con.on('error',function(err){
        console.log('handler error')
        console.log(err);
    })
}).listen(port);
console.log('websocket server listen in port '+port);