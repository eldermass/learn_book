<!-- markdownlint-disable MD030 -->

# DOM

浏览器解析的主流流程：

-   建立 DOM 渲染树，同时生成 CSS Tree
-   将 cssTree 挂到 DomTree，layout(reflow)后，生成 renderTree
-   按照 renderTree 渲染页面

Dom 节点的增删改查，都会 reflow(重排) 重新构建 domTree，效率最低  
样式一类的改动会 repaint(重绘)，重绘 cssTree 部分分支，效率较低

## DOM 结构树

```js
// DOM 结构树是一个继承关系
// document 的结构树
Object-- > EventTarget-- > Node-- > Document-- > HTMLDocument

// div 元素的结构树
Object-- > EventTarget-- > Node-- > Element-- > HTMLElement-- > HTMLDivElement

// 例如 getElementById 只在 Document.prototype 上
// document.getElementById('box').getElementById 就是不存在的
```

## 节点

实现一个获取元素节点的方法

```html
<div id="demo">
    <span></span>
    <a href=""></a>
    <!--this is a node test-->
</div>
<script>
    let demo = document.getElementById("demo")
    let eNodes = getElementNodes(demo.childNodes)
    // 模拟从所有子节点中选取元素节点的方法
    function getElementNodes(nodes) {
        // 新建一个类数组
        let arr = {
            length: 0,
            push: Array.prototype.push,
            splice: Array.prototype.splice,
        }
        for (let i of nodes) {
            if (i.nodeType == 1) {
                //元素节点1 属性节点2 文本节点3
                arr.push(i)
            }
        }
        return arr
    }
</script>
```

```html
<div class="box">12</div>
<div class="box">34</div>
<div class="box" id="mid">56</div>
<div class="box">78</div>
<div class="box">90</div>
<script>
    let divs = document.getElementsByClassName("box")
    // getId 等方法是实时的，元素的添加和减少，都会随之改变

    let div = document.querySelectorAll(".box")
    // querySelectorAll 选取元素的方法不是实时的，不会根据元素节点改变而改变

    let mid = document.getElementById("mid")

    // 节点树操作
    /*
        parentNode   -->  父节点
        childNodes   -->  子节点们
        firstChild   -->  第一个子节点
        lastChild    -->  最后个子节点
        nextSibling  -->  后一个兄弟节点
        previousSibling --> 前一个兄弟节点
    */
    let childs = document.body.childNodes
    // childNodes 包含了 元素节点、文本节点、注释节点、属性节点

    // 遍历元素节点树
    /*
     * parentElement
     * children
     * firstElementChild
     * lastElementChild
     * nextElementSibling
     * previousElementSibling
     * */

    // 节点的四个属性
    /*
     * nodeName    -->  comment text element 等
     * nodeValue   -->  仅 text comment 才有
     * nodeType    -->  元素节点1 属性节点2 文本节点3 注释节点8 document9 DocumentFragment11
     * attributes
     * */

    /* 元素的属性
        innnerHTML 内部 html 字符
        innerText  内部除了 html 标签的字符
        textContent 内部除了 html 标签的字符(不包含换行等空白字符)
        setAttribute(key,value) getAttribute(key)
    * */
</script>
```

元素节点的增删查改

```js
// 新建一个元素节点
document.createElement()
document.createTextNode()
document.createComment()
document.createDocumentFragment()

// 删除
parentNode.removeChild(el) // 返回被移除的 el 元素
el.remove()

// 插入
el.appendChild(el)
el.insertBefore(newNode, refNode)

// 修改
parentNode.replaceChild(newNode, oldNode) // 返回oldNode
```

## 封装的元素操作函数

```js
// 返回第n个祖先
function retAncestor(el, n) {
    if (el == null) return null
    if (n == 0) {
        return el
    }
    return retAncestor(el.parentNode, n - 1)
}

// 给元素添加myChildren方法，no children()
Element.prototype.myChildren = retChildElement
function retChildElement() {
    let arr = {
        length: 0,
        push: Array.prototype.push,
        splice: Array.prototype.splice,
    }
    let nodes = this.childNodes
    for (let i in nodes) {
        if (nodes[i].nodeType == 1) {
            arr.push(nodes[i])
        }
    }
    return arr
}

// 返回第n个前后兄弟节点的方法
function retSiblings(el, n) {
    if (el == null) return null
    if (n == 0) {
        return el
    }
    if (n < 0) {
        return retSiblings(el.previousElementSibling, n + 1)
    }
    if (n > 0) {
        return retSiblings(el.nextElementSibling, n - 1)
    }
}

// for(e = e.nextSibling;e.nodeType != 1;e = e.nextSibling) //类似直接找ElementSibling

// 往后插入
Element.prototype.insertAfter = function (newNode, oldNode) {
    this.insertBefore(newNode, oldNode)
    this.insertBefore(this.removeChild(oldNode), newNode)
    // 第二种方法
    // let p = oldNode.nextSibling
    // p || this.appendChild(newNode)
    // if(p != null){
    //   this.insertBefore(newNode , p)
    // }
}

// reverse 元素
Element.prototype.reverseElement = function () {
    let children = this.children
    for (let i = children.length - 1; i >= 0; i--) {
        this.appendChild(children[i])
    }
}
```

## DOM 操作

### 事件处理模型

浏览器中事件的触发是先由 html **结构上**(非视觉上)的嵌套关系，由上至下捕获，成功捕获并执行事件后，再由下至上冒泡的。focus blur change submit reset select 没有冒泡

```js
/*  事件监听
    1  句柄监听  el.onclick = func
    2  添加监听，可以多个 addEventListener(even,func,boolean) 事件类型，函数
            第三个参数   true - 事件句柄在捕获阶段执行
                        false- 默认。事件句柄在冒泡阶段执行
            ie9里 attachEvent  --detachEvent
* */

/*  解除事件监听
    el.onclick = false  或  null
    el.removeEventListener(event,func,boolean)  func一定是同一个引用
* */

/* 阻止事件传递（冒泡 或 捕获 ）propagation-蔓延
event.stopPropagation()
ie -->  e.cancelBuble
* */

/* 阻止默认事件
    e.preventDefault()
    e.returnValue = false   -->  ie

    return false
    a标签能写在行间取消默认事件，<a href='javascript:void(0)'>a</a>
* */

/* 事件源对象
记录了事件触发源的元素, 可以用作 事件委派
    e.target
    e.srcElement  -->  ie

让某个元素能捕获 window 的全部事件
    el.setCapture()  el.releaseCapture()  仅 ie 能用
* */
```

### 获取 css 计算属性

```js
// box.style返回行内样式表      read-write

// 获取css计算属性
// getComputedStyle(el,伪元素) 获取(显示值)的样式表   read-only
Element.prototype.getStyle = function (prop) {
    if (window.getComputedStyle) {
        return getComputedStyle(this)[prop]
    } else {
        return this.currentStyle[prop]
    }
}
```

### 元素位置的操作

```js
/*  窗口滚动条位置
    window.pageXOffset
    window.pageYOffset

ie：
    document.body.scrollTop/Left
    document.documentElement.scrollTop/Left
 * */

/* 操作滚动条
    window.scroll(x,y)      等于scrollTo()  滚动至x,y位置  对应pageYOffset
    window.scrollBy(x,y)    向某方向滚动 x，y 距离， 累加的
 * */

/* 可视区 (能看到的部分) 窗口
window.innerHeight
window.innerWidth

兼容ie
    混合模式    document.body.clientHeight   ~~body的高
    标准模式    document.documentElement.clientHeight   ~~html的高
 * */

/* 获取元素宽高
el.getBoundClientRect()
 * */

/* 屏幕的宽高
scrollHeight    不含border
clientHeight    不含border
offsetHeight    含有border
screen.height   屏幕的高
window.screen.availHeight   可用高度

offsetWidth offsetHeight   //   包含border的整体宽高
offsetTop   offsetLeft  //      注意，这是相对于有定位的上级元素的位置 ,不含父级的border
父级有定位就是相对于父级，父级没定位就往上级找
box.offsetParent  //    返回一个有定位父级元素，没有就是body
 * */

//  封装方法getElementPosition 获取当前元素距离文档的位置
function getElementPosition(el) {
    let p = {
        x: 0,
        y: 0,
    }
    if (el.offsetParent != null) {
        //这样是没有加上父级border的，需要完善
        p.x += getElementPosition(el.offsetParent).x
        p.y += getElementPosition(el.offsetParent).y
    }
    p.x += el.offsetLeft
    p.y += el.offsetTop
    return p
}
```
