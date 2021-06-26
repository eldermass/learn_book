# Web Worker

Web Worker 是 HTML5 标准的一部分，这一规范定义了一套 API，它允许一段 JavaScript 程序运行在主线程之外的另外一个线程中。值得注意的是， Web Worker 规范中定义了两类工作线程，分别是专用线程 Dedicated Worker 和共享线程 Shared Worker，其中，Dedicated Worker 只能为一个页面所使用，而 Shared Worker 则可以被多个页面所共享。

## 使用

```js
var myWorker = new Worker("my_task.js")

// my_task.js中的代码
var i = 0
function timedCount() {
    i = i + 1
    postMessage(i)
    setTimeout(timedCount, 1000)
}
timedCount()
```

通过 URL.createObjectURL()创建 URL 对象，可以实现创建内嵌的 worker。
worker 可以使用 postMessage 和 onmessage 来相互通信

```js
var myTask = `
    onmessage = function (e) {
        var data = e.data;
        data.push('hello');
        console.log('worker:', data); // worker: [1, 2, 3, "hello"]
        postMessage(data);
    };
`

var blob = new Blob([myTask])
var myWorker = new Worker(window.URL.createObjectURL(blob))

myWorker.onmessage = function (e) {
    var data = e.data
    console.log("page:", data) // page: [1, 2, 3, "hello"]
    console.log("arr:", arr) // arr: [1, 2, 3]
}

var arr = [1, 2, 3]
myWorker.postMessage(arr)
```

## 上下文

Worker 执行的上下文，与主页面执行时的上下文并不相同，最顶层的对象并不是 window，而是个一个叫做 WorkerGlobalScope 的东东，所以无法访问 window、以及与 window 相关的 DOM API，但是可以与 setTimeout、setInterval 等协作。
WorkerGlobalScope 作用域下的常用属性、方法如下：
1、self
　　 我们可以使用 WorkerGlobalScope 的 self 属性来或者这个对象本身的引用
2、location
　　 location 属性返回当线程被创建出来的时候与之关联的 WorkerLocation 对象，它表示用于初始化这个工作线程的脚步资源的绝对 URL，即使页面被多次重定向后，这个 URL 资源位置也不会改变。
3、close
　　关闭当前线程
4、importScripts
　　我们可以通过 importScripts()方法通过 url 在 worker 中加载库函数
5、XMLHttpRequest
　　有了它，才能发出 Ajax 请求
6、setTimeout/setInterval 以及 addEventListener/postMessage

终止 terminate()
在主页面上调用 terminate()方法，可以立即杀死 worker 线程，不会留下任何机会让它完成自己的操作或清理工作。另外，Worker 也可以调用自己的 close() 方法来关闭自己

```js
// 主页面调用
myWorker.terminate()

// Worker 线程调用
self.close()
```
