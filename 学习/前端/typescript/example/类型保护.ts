// 类型保护
interface Bird {
    fly()
    layEggs()
}

interface Fish {
    swim()
    layEggs()
}

function getSmallPet(): Fish | Bird {
    // ..
}

let pet = getSmallPet()

// 类型保护
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined
}

if (isFish(pet)) {
    pet.swim
} else {
    // 这里能推断出另外一种类型
    pet.fly()
}
// instanceof
// if(pet instanceof Fish) {
    // 这里也能推断出 pet 是Fish
//     pet.swim()
// }

// 类型保护2
function paddingLeft(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value
    }
    if (isString(padding)) {
        return padding + value
    }
    throw new Error(`Expected string or number got ${typeof padding}`)
}

function isNumber(x: any): x is number {
    return typeof x === "number"
}
function isString(x: any): x is string {
    return typeof x === "string"
}
