async function add(next){
    console.log('1')
    await next()
    console.log('3')
}
async function double(next){
    await new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve()
        },2000)
    })
    console.log('2')
}



function compose(mids){
    return function () {
        return dispatch(0)

        function dispatch(i){
            let fn = mids[i]
            if(!fn){
                return Promise.resolve()
            }
            return Promise.resolve(fn(function(){
                return dispatch(i + 1)
            }))
        }
    }
}
let middlewares = [add, double]
let fn = compose(middlewares)

let res = fn()
console.log(res)