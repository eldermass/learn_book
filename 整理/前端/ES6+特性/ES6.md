# ES6+ 特性

## 模块导入导出

静态的 import 语句用于导入由另一个模块导出的绑定。无论是否声明了 strict mode ，导入的模块都运行在严格模式下。在浏览器中，import 语句只能在声明了 type="module" 的 script 的标签中使用。

此外，还有一个类似函数的动态 import()，它不需要依赖 type="module" 的 script 标签。

```js
// 导出、导入
export const a = 1
export { a, b, c }
export default App

import { a, b, c }, App from "./module"

// 别名
import { a as e } from "./module"
// 合并引入
import * as All from "./module"

// 引入文件
import("./1.js")

// 老的导出方式
module.exports = a
exports = {a}
exports.a = b

const a = require('./module')
```

## ES2019 新特性

```js
//  try catch 简写
try {
} catch {}
// Symbol 描述
let s = Symbol("foo")
s.description
// Object.fromEntries() 和 entries 作用相反
// Array.flat() Array.flatMap()
// String.trimStart() String.trimEnd()
```

## ES2020 新特性

```js
// String.matchALl() 和 String.match 的返回值不同，是iterator
// 动态引入
export function hello() {} // a.js
import("a.js").then((module) => module.hello())
// BigInt
// Promise.allSettled 跟promise.all 类似，但是不会短路
Promise.allSettled(promiseArr)
// 在浏览器中，window 代指全局对象，Node 环境中，global 代指全局对象，webWorker 中，self 代指全局对象
globalThis
// 调用链 Optional Chaining
obj?.value // 获取对象值
func?.() // 调用函数
// Nullish coalescing Operator(??) 只有在值为 null 或者 undefined 的时候才取后面的值 类似 ||
null ?? "val"
// import meta
import.meta // {url: "file:xxx.js"}
```

## ES2021 新特性

```js
String.prototype.replaceAll()
Promise.any()
// WeakRef
var foo = () => {
    console.log("hi")
}
var weakFoo = new WeakRef(foo)
// 逻辑运算
x &&= y // 相当于 x && (x = y)
x ||= y // 相当于 x || (x = y)
x ??= y // 相当于 x ?? (x = y)
// Numeric separators 方便读写
const b = 1_000_000
console.log(b) // 1000000
```

## ES2022 新特性

```js
// Class 域 私有变量
class ClassWithPrivateProperty {
  #privateField;
  static #PRIVATE_STATIC_FIELD;

  constructor() {
    this.#privateField = 42;
  }

  #privateMethod() {
    return 'hello world';
  }

  static #privateStaticMethod() {
    return 'hello world';
  }
}
// in 可以判断私域是否存在该变了

// 正则修饰符 d，结果中又 indices
RegExp Match Indices
// top-level 的 await，不用写在函数中了
// Array.at() 可以倒数取索引
[1,2,3].at(-1) // 3
// 类似 hasOwnProperty
Object.hasOwn(object, "foo")
// Class Static Block 静态类
```
