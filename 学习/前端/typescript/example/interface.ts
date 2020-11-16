// 可选、只读
interface Square {
    width: number
    height: number
    color?: string
    readonly t: string
    // [propName: string]: string
}

function getAreaOfSquare(square: Square): number {
    console.log(square.color)
    return square.height * square.width
}

console.log(getAreaOfSquare({ width: 10, height: 10, t: "stead" }))

// 函数接口
interface searchFunc {
    (source: string, sub: string): boolean
}

let searchF: searchFunc = (src, sub) => {
    return src.search(sub) > -1
}

// 混合类型
interface Counter {
    (start: number): string
    interval: number
    reset(): void
}

function getCounter(): Counter {
    let counter = ((start: number) => {}) as Counter
    counter.interval = 12
    counter.reset = () => {}
    return counter
}

// 接口集成类
