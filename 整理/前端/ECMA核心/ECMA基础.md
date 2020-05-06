<!-- markdownlint-disable MD030 -->

# ECMA 核心

## DOM

浏览器解析的主流流程：

- 建立 DOM 渲染树，同时生成 CSS Tree
- 将 cssTree 挂到 DomTree，layout(reflow)后，生成 renderTree
- 按照 renderTree 渲染页面

Dom 节点的增删改查，都会 reflow(重排) 重新构建 domTree，效率最低  
样式一类的改动会 repaint(重绘)，重绘 cssTree 部分分支，效率较低

### DOM 结构树

```js
// DOM 结构树是一个继承关系
// document 的结构树
Object-- > EventTarget-- > Node-- > Document-- > HTMLDocument

// div 元素的结构树
Object-- > EventTarget-- > Node-- > Element-- > HTMLElement-- > HTMLDivElement

// 例如 getElementById 只在 Document.prototype 上
// document.getElementById('box').getElementById 就是不存在的
```
