// 泛型
class GenericNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T
}

let n = new GenericNumber<number>()
let s = new GenericNumber<string>()

// 泛型约束
interface Lengthwise {
    length: number
}

function identity<T extends Lengthwise>(x: T): T {
    console.log(x.length) // 在约束后这里才不会报错
    return x
}

// 约束为属性
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}
getProperty({ age: 1 }, "age")

// 泛型 - 类类型

function createObj<T>(con: { new (): T }): T {
    return new con()
}

//
class Beekeeper {
    beetag: string
}

class Lionkeeper {
    liontag: string
}

class Animal {
    animalName: string
}

class Bee extends Animal {
    keeper: Beekeeper
}

class Lion extends Animal {
    keeper: Lionkeeper
}

function createInstance<T extends Animal>(con: new () => T): T {
    return new con()
}

let b = createInstance(Lion)