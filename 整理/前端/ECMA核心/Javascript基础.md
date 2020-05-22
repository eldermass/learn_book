<!-- markdownlint-disable -->

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

### 严格模式

```js
'use strict'

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
