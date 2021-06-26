interface DeepClone<T = any> {
    (origin: T, target?: any): T
}


let deepClone: DeepClone = function deepClone(origin: any, target?: any) {
    target = target || {}
    Object.keys(origin).forEach(key => {
        let val = origin[key]
        if (isObject(val)) {
            target[key] = deepClone(val)
        } else if (isArray(val)){
            target[key] = deepClone(val, [])
        } else {
            target[key] = val
        }
    })
    return target
}

function isObject(value: any): value is Object {
    return Object.prototype.toString.call(value) === '[object Object]'
}

function isArray(value: any): value is Array<any> {
    return Array.isArray(value)
}


const obj = {
    foo: 'bar',
    bar: {
        a: 1
    }
}

const obj2 = deepClone(obj)

obj2.foo = 'bad'
obj2.bar.a = 0

console.log(obj.foo, obj.bar.a)