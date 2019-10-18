interface Talk {
    (a: number, b: number): number
}

let hello: Talk
hello = (a, b) => {
    const sum = a + b
    console.log(`${a} + ${b} = ${sum}`)
    return sum + 1010
}
export default hello