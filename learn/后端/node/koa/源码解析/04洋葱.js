function add(x, y){
    return x + y
}
function double(n){
    return 2*n
}
// 傻逼做法
// let res1 = add(1, 2)
// let res2 = double(res1)
// console.log(res2)

// 洋葱圈原理
const middlewares = [add, double] //储存所有的中间件
let len = middlewares.length

//把传入的中间件，封装为一个整体函数
function compose(midds){
    return (...args) => {
        let res = midds[0](...args) //执行第一个中间件
        for(let i = 1; i < len; i++){
            //把之前的结果一次保存到后面执行
            res = midds[i](res)
        }
        return res
    }
}
//使用
let fn = compose(middlewares)  
let res = fn(1, 2)
console.log(res)