const jwt = require('jsonwebtoken')
let token = jwt.sign({ 
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: 'foobar'
    }, 'shhhhh'
    // , (err, data) => {
    //     console.log(err, data)
    //  // 传入了回调就是异步执行的函数
    // }
    );
console.log(token)

let verify = jwt.verify(token , 'shhhhh', (err, deco) => {
    console.log(err, deco)
});
console.log(verify)

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1Mzc3NjA1NTh9.TOF39tu9Rt-BO-LBsMWXEb3np_m3HWs2yHdaBm2zz74'
// let decode = jwt.decode(token + '11')

// console.log(decode)

// let t = require('./jwt')
// let ts = t.sign({test: 00}, 3000)
// console.log(ts)
// t.verify(ts).then(res => {
//     console.log(res)
// }).catch(
//     err => console.log(err)
// )