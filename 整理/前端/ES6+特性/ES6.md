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

