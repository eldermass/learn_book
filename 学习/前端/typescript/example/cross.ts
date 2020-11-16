// 交叉类型 &
function extend<T, U>(first: T, second: U): T & U {
    let res = {} as T & U
    for (let id in first) {
        res[id] = first[id] as any
    }

    for (let id in second) {
        if (!res.hasOwnProperty(id)) {
            res[id] = second[id] as any
        }
    }
    return res
}

class Person {
    constructor(public name: string) {}
}

interface Loggable {
    log(): void
}

class ConsoleLogger implements Loggable {
    log() {
        // ..
    }
}

let cro = extend(new Person("Jimmy"), new ConsoleLogger())
// cro.name
// cro.log()