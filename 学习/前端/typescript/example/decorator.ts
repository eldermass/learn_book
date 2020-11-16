// 类装饰器
function log(target) {
    target.prototype.logger = () => `${target.name} 被调用`
}

@log
class Animal {}

let a = new Animal() as any

a.logger()

//
function beep(sound: string) {
    return function (target: any) {
        console.log("listened " + sound)
        target.prototype.wawa = () => console.log("wawa")
    }
}

function method(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    console.log(target)
    console.log(propertyKey)
    console.log(descriptor)
}

@beep("wolf")
class Dog {
    @method
    sayHi() {
        return "say Hi !!!"
    }
    @method
    static alwaySayHi() {
        return "ok"
    }
}

let d = new Dog() as any

d.wawa()
d.sayHi()
