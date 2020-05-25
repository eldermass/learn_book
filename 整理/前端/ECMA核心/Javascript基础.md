<!-- markdownlint-disable -->

## 预编译

### 预编译

预编译时有一下四步

-   第一步，创建一个 GO 对象（函数创建 AO 对象） 这个对象就是执行期上下文
-   第二步，在 AO 或 GO 对象里，创建属性
-   第三步，把传入的实参 复制到 AO 对象的属性上
-   第四步，把函数体放在 AO 或者 GO 对象的属性上

```js
var g = 100
function fn(a) {
    console.log(a)
    console.log(b)
    console.log(c)
    a = 10
    var b = function () {}
    function c() {}
    console.log(a)
    console.log(b)
    console.log(c)
}
fn(1)

// 1.创建GO对象
/* 2.添加属性
GO {
    g: undefined,
    fn: undefined
}*/
/* 3.把函数体添加到属性上
GO {
    g: undefined,
    fn: function fn(){}
}*/

//在函数执行时
//1.创建AO对象
/*2.添加属性
AO {
    a: undefined
    b: undefined
    c: undefined
}*/

/*3.把形参与实参同步
AO {
    a: 1
    b: undefined
    c: undefined
}*/

/*4.把函数体添加到AO对象的属性上
AO {
    a: 1
    b: undefined
    c: function c(){}
}*/
```

## 其他

### setter 与 getter

```js
let son = {
    _name: "无名孙",
    get name() {
        return "孙名：" + this._name
    },
    set name(val) {
        console.log(`赐名: ${val}`)
        this._name = val
    },
}
console.log(son.name)
son.name = "黄宇荐"
console.log(son.name)
```

### 创建和派发事件

```js
// 1.创建一个事件
let evt = document.createEvent("Event")
// 2.初始化事件（三个参数：事件名，是否起泡，是否取消默认触发）
evt.initEvent("change", true, true)
// 派发事件
window.dispatchEvent(evt)

// 修改 click 事件的本身属性
MouseEvent.prototype._myProps = "this_is_new_props_from_proto"
window.addEventListener("click", (e) => {
    console.log(e)
    console.log(e._myProps) // 这里就会有新加的属性
})
```

### use 插件

```js
let Obj = {
    name: "test",
    use: function (add) {
        add(this)
    },
}
let pulugin = function (obj) {
    obj.getName = function () {
        return obj.name
    }
}
console.log(Obj)
Obj.use(pulugin)
```

### 严格模式

```js
"use strict"

/*
    es3 和 es5冲突的按es5执行
    1. arguments.callee   func.caller  不能用
    2. 使用变量必须先声明
    3. 局部的this必须被赋值，预编译this不再指向为window
    4. 拒绝重复属性和参数
    5. 禁止使用eval()
 * */

// with能添加作用域链最底端，直接找 obj 的 AO
let obj = {
    name: "obj",
}
let name = "window"
with (obj) {
    // let name ='with'
    console.log(name) // obj
}
// 能解决命名空间的问题，可以直接访问-添加的obj-最近的执行期上下文 AO
```

### 数据交互

```js
// 原生发起 ajax 请求
function getDate() {
    var xhr = new XMLHttpRequest()
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log(xhr.responseText)
        }
    }
    xhr.open("POST", "path", true)
    //设置消息头是必须的
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    //发送的参数应该放在send里面
    xhr.send("name=" + name)
}

// fetch 获取数据
fetch("http://www.baidu.com")
    .then((res) => res.json())
    .then((res1) => console.log(res1))
```
