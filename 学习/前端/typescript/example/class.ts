// 实例接口
interface ClockInterface {
    tick()
}

// 静态接口
interface ClockConstructor {
    new (hour: number, minute: number)
    clock(): void
}

function createClock(
    ctor: ClockConstructor,
    h: number,
    m: number
): ClockInterface {
    return new ctor(h, m)
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log("ha ha ha")
    }

    static clock() {
        console.log("clock clock")
    }
}

let digital = createClock(DigitalClock, 1, 2)

// 存取器
let password = "secret password"

class Person {
    private _fullName: string

    get fullName(): string {
        return this._fullName
    }

    set fullName(newName: string) {
        if (password === 'secret password') {
            this._fullName = newName
        } else {
            console.log('Error: Unauthorized update of person')
        }
    }
}


