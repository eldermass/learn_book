async function fn1(next){
    console.log('fn1')
    await next()
    console.log('fn1 end')
}

async function fn2(next){
    console.log('fn2')
    await delay()
    await next()
    console.log('fn2 end')
}
function fn3(){
    console.log('fn3')
}

//测试延时
function delay(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('yes')
        },2000)
    })
}
// 依次执行3个函数，实现洋葱模型
// 异步compose 的实现

function compose(middlewares){
    return function(){
        return dispatch(0)   // 控制分发，是否继续执行

        function dispatch(i){
            let fn = middlewares[i]  // 当前的中间件函数
            if(!fn){
                return Promise.resolve() // 当前中间件不存在，就返回
            }
            //next 执行时  里面包装的next函数 , fn(next)
            return Promise.resolve(fn(function next(){
                return dispatch(i + 1)
                // 当next被调用时，执行下一个中间件
                // 此时i被闭包
            }))
        }
    }
}

let midds = [fn1,fn2,fn3]
let finaFn = compose(midds)
finaFn()