# 继承

## 一、js 作为面向对象的若数据类型语言，其也是有继承特性的。但是由于 js 的类本身是函数，这就导致了 js 继承的特殊性

1. 既然要继承，那么我们就先创建一个父类，这个父类的构造函数里有一个属性和一个方法，原型上也有一个属性和一个方法。

```js
//首先定义一个父类
function Parent(lastName = "建国") {
    this.lastName = lastName;
    //一个方法
    this.canDo = () => {
        console.log(`${this.firstName + this.lastName} can sleeping and eating only`);
    };
}
//一个原型上的方法
Parent.prototype.firstName = "张";
Parent.prototype.say = function() {
    console.log(`我名字就是${this.lastName}`);
};

let p = new Parent();
```

2.父类的方法有了，那我们怎么让子类继承父类呢？

2.1 原型链继承  
 原型链继承不能继承父类构造函数上的属性和方法，且如果是引用的方式，修改子类的原型会影响到父类

```js
//让Son原型 为Parent的实例
// Son.prototype = new Parent()
//让Son的原型 引用 Parent的原型
Son.prototype = Parent.prototype;

function Son(lastName) {
    this.lastName = lastName;
}
let s = new Son("小红");
```

2.2 构造函数继承  
 构造函数继承并不能继承父类原型上的方法和属性

```js
function Son(lastName) {
    Parent.call(this, lastName);
}
let s = new Son("小红");
```

2.3 另有实例继承、拷贝继承等方式，都不常用

2.4 组合继承,由于子类的原型是父类实例，导致子类原型被覆盖

```js
//组合继承
function Son(lastName) {
    Parent.call(this, lastName);
}
//子类原型上的cry方法就不可调用
Son.prototype.cry = function() {
    console.log("con cry");
};
Son.prototype = new Parent();
let s = new Son("小红");
```

2.5 **组合寄生继承**，继承常用的方法，主要思路是利用子类的构造器，和没有实例属性的父类为原型，弥补了之前各种方法的不足。

```js
function Son(lastName) {
    Parent.call(this, lastName);
}
(function() {
    //创建一个没有方法属性的函数，用于过度
    let F = function() {};
    F.prototype = Parent.prototype;
    Son.prototype = new F();
})();
//子类原型上的方法也能够使用了
Son.prototype.cry = function() {
    console.log("son cry");
};
let s = new Son("小红");
```

## 二、根据上面的描述，整体写一下继承的函数

1. 封装一个简单的继承函数

```js
let inherit = (function() {
    let F = function() {};
    return function(Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
        Target.prototype.uber = Origin.prototype;
    };
})();

inherit(Son, Parent);
```

2.改进后完整的例子,简单的总结继承就是用子类自己的构造器，用父类的原型

```js
//父类
function Parent(lastName = "建国") {
    this.lastName = lastName;
    this.canDo = () => {
        console.log(`${this.firstName + this.lastName} can sleeping and eating only`);
    };
}
//父类原型上的方法
Parent.prototype.firstName = "张";
Parent.prototype.say = function() {
    console.log(`我名字就是${this.lastName}`);
};
//子类
function Son(lastName, nickname) {
    Parent.call(this, lastName);
    this.nickname = "红红";
}

function inherit(Target, Origin) {
    //这里可以直接得到之前的空实例原型
    let proto = Object.create(Origin.prototype);
    proto.constructor = Target;
    console.log(proto);
    Target.prototype = proto;
}
inherit(Son, Parent);

//子类原型上的方法也能够使用了
Son.prototype.cry = function() {
    console.log("son cry");
};

let s = new Son("小红");
```

### 三、在 es6 里，继承的实现可以变的更加简单

```js
class Father {
    constructor(lastName = "建国") {
        this.lastName = lastName;
        this.firstName = "张";
    }
    canDo() {
        console.log(`${this.firstName + this.lastName} can do nothing`);
    }
}

class Son extends Father {
    constructor(lastName) {
        super();
        this.lastName = lastName;
    }
    cry() {
        console.log(`${this.lastName} just can cry`);
    }
    canDo() {
        //方法也能继承，如果不写super，就会覆盖父类方法，类似于c++重写
        super.canDo();
        console.log(`${this.lastName} 厉害了，什么都能做`);
    }
}
let s = new Son("红红");
```
