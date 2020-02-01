# proxy 对象代理 代理模式的实现

> 代理模式的实现，一般用于，代理拦截，预警，上报，统计，扩展功能

1. Proxy 函数接收两个对象 (target, handler) 被代理对象，，对代理对象的操作

## 1.get 获取某个属性时触发

```js
let person = {
    name: "CY",
    age: 108
};
let obj = new Proxy(person, {
    get(target, property) {
        //代理对象，访问属性
        console.log(target, property);
        return `你访问了${property}属性`;
    }
});
console.log(obj.name);
```

```js
//访问一个对象的属性，当属性不存在的时候，就返回^_^，
let json = { name: "CY" };

let obj = new Proxy(json, {
    get(target, property) {
        if (property in target) {
            return target[property];
        } else {
            console.warn(`${property}属性不存在`);
            return `^_^`;
        }
    }
});

console.log(obj.name); //CY
console.log(obj.age); //^_^
```

## 2.set 当设置某个属性时触发

```js
let person = {
    name: "Wangjing",
    age: 108
};
let obj = new Proxy(person, {
    set(target, property, val) {
        console.warn("你生下来后名字就只能是" + target[property]);
        return `改名为${val}失败`;
    }
});
console.log((obj.name = "张三"));
```

> 限制 age 属性为 100 以下的整数

```js
let obj = new Proxy(
    {},
    {
        set(target, property, value) {
            if (property == "age") {
                if (!Number.isInteger(value)) {
                    throw new TypeError(" is not integer");
                }
                if (value > 100) {
                    throw new RangeError("you are too old");
                }
            }
            return (target[property] = value);
        }
    }
);
obj.age = 123;
```

## 3.apply 用于代理函数执行时

```js
function fn(...n) {
    console.log(n);
    return "i am fn";
}
let newfn = new Proxy(fn, {
    apply(fn) {
        let res = fn.apply(this, arguments[2]);
        // 可以获取函数返回值
        console.log(res);
        return "i am in proxy";
    }
});
console.log(newfn(2, 3));
```

> 使用 reflect 可以写得更简便

```js
function fn(a, b) {
    return a + b;
}
let newfn = new Proxy(fn, {
    apply(target, context, args) {
        return Reflect.apply(...arguments);
    }
});
console.log(newfn(2, 3));
```

## 3.deleteProperty 用于删除属性时

```js
let json = {
    a: 1,
    b: 2
};
let newJson = new Proxy(json, {
    deleteProperty(target, property) {
        console.log(`you are deleting ${property}`);
        // delete target[property]
        return Reflect.deleteProperty(target, property);
    }
});

delete newJson.a; //调用deleteProperty
console.log(json);
```

## 3.has 用于查询属性时

```js
let json = {
    a: 1,
    b: 2
};
let newJson = new Proxy(json, {
    has(target, property) {
        console.log("using method has()");
        // 返回一个欺骗大众的值
        return true;
    }
});
console.log(3 in newJson); // true

console.log(json);
```

> 例子, 模仿一下 react 里定义虚拟 dom 的语句

```js
let React = new Proxy(
    {},
    {
        get(target, property) {
            if (property === "createElement") {
                return function(tag, attr = {}, ...children) {
                    let el = document.createElement(tag);
                    for (let key of Object.keys(attr)) {
                        el.setAttribute(key, attr[key]);
                    }
                    for (let child of children) {
                        if (typeof child === "string") {
                            child = document.createTextNode(child);
                        }
                        el.appendChild(child);
                    }
                    return el;
                };
            }
        }
    }
);
let dom = React.createElement("div", { id: "text" }, React.createElement("p", { class: "name" }, "dogone"));
console.log(dom);
document.body.appendChild(dom);
```

> 顺便说一句 Reflect.apply 的参数，_Reflect.apply(反射的函数,this 指向,值-数组_
