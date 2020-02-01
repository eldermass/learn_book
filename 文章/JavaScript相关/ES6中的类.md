# 类的定义

1.一般的定义

```js
class Person {
    constructor(name, age) {
        [this.name, this.age] = [name, age];
    }
    // 函数挂载于原型上
    showName() {
        return `my name is ${this.name}`;
    }
}
```

2.赋值式定义

```js
const Person = class {
    constructor(name, age) {
        [this.name, this.age] = [name, age];
    }
    showName() {
        return `my name is ${this.name}`;
    }
};
```

## 可变函数

1. 类似 php 等语言，可以把变量用作函数名

```js
let a = "func";
class Demo {
    constructor(name) {
        this.name = name;
    }
    [a]() {
        console.log("我是一个可变函数");
    }
}
let d = new Demo();
d[a](); // 我是一个可变函数
```

## set 与 get

1. get 当获取一个属性时触发，set 当设置一个值触发，会拦截默认操作

```js
class Person {
    constructor() {}
    get name() {
        console.log("正在获取name属性");
        return this._name;
    }
    set name(val) {
        console.log(`正在设置name属性，name的值是${val}`);
        this._name = val;
    }
}
let p1 = new Person();
p1.name = "222";
console.log(p1.name);
```

> 运行结果如下
> ![image](https://i.loli.net/2018/09/07/5b91dac884022.png)

## 静态方法

```js
class Person {
    constructor() {}
    static aaa() {
        return "这是一个静态方法";
    }
}
console.log(Person.aaa());
```

## 继承

1. es6 的继承使用了 extends 关键字，使用方法与其他语言接近

```js
//父类
class Person {
    constructor(name) {
        this.name = name;
    }
    showName() {
        return this.name;
    }
}
//子类
class Student extends Person {
    constructor(name, age) {
        //super需要放在前面
        super(name);
        this.age = age;
    }
}
let stu1 = new Student("Jack", 23);
console.log(stu1);
console.log(stu1.showName());
```

2.值得注意的是，类中定义的函数也可以继承

```js
class Student extends Person {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
    showName() {
        //方法也能继承，如果不调用super 就是重写父类方法
        super.showName();
        console.log("子集的showname");
    }
}
```
