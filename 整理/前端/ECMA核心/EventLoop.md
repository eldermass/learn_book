# Event Loop

<!-- https://juejin.cn/post/6844903764202094606 -->
<!-- https://juejin.cn/post/6844903843197616136 -->

Event Loop 即事件循环，是指浏览器或 Node 的一种解决 javaScript 单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。

## 微任务/宏任务

在 JavaScript 中，任务被分为两种，一种宏任务（MacroTask）也叫 Task，一种叫微任务（MicroTask）。
MacroTask（宏任务）

script 全部代码、setTimeout、setInterval、setImmediate（浏览器暂时不支持，只有 IE10 支持，具体可见 MDN）、I/O、UI Rendering。

MicroTask（微任务）

Process.nextTick（Node 独有）、Promise、Object.observe(废弃)、MutationObserver（具体使用方式查看这里）

## 浏览器中的 Event Loop

Javascript 有一个 main thread 主线程和 call-stack 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。
事件触发线程管理的任务队列是如何产生的呢？事实上这些任务就是从 JS 引擎线程本身产生的，主线程在运行时会产生执行栈，栈中的代码调用某些异步 API 时会在任务队列中添加事件，栈中的代码执行完毕后，就会读取任务队列中的事件，去执行事件对应的回调函数，如此循环往复，形成事件循环机制，

### 同步任务和异步任务

Javascript 单线程任务被分为`同步任务`和`异步任务`，同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。

事件循环的进程模型

-   选择当前要执行的任务队列，选择任务队列中最先进入的任务，如果任务队列为空即 null，则执行跳转到微任务（MicroTask）的执行步骤。
-   将事件循环中的任务设置为已选择任务。
-   执行任务。
-   将事件循环中当前运行任务设置为 null。
-   将已经运行完成的任务从任务队列中删除。
-   microtasks 步骤：进入 microtask 检查点。
-   更新界面渲染。
-   返回第一步。

宏任务和微任务的区别

-   宏任务是每次执行栈执行的代码（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）
-   浏览器为了能够使得 JS 引擎线程与 GUI 渲染线程有序切换，会在当前宏任务结束之后，下一个宏任务执行开始之前，对页面进行重新渲染（宏任务 > 渲染 > 宏任务 > ...）
-   微任务是在当前宏任务执行结束之后立即执行的任务（在当前 宏任务执行之后，UI 渲染之前执行的任务）。微任务的响应速度相比 setTimeout（下一个宏任务）会更快，因为无需等待 UI 渲染。
-   当前宏任务执行后，会将在它执行期间产生的所有微任务都执行一遍。

根据事件循环机制，重新梳理一下流程：

-   执行一个宏任务（首次执行的主代码块或者任务队列中的回调函数）
-   执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
-   宏任务执行完毕后，立即执行当前微任务队列中的所有任务（依次执行）
-   JS 引擎线程挂起，GUI 线程执行渲染
-   GUI 线程渲染完毕后挂起，JS 引擎线程执行任务队列中的下一个宏任务

### Node 的 Event Loop

Node 的 Event loop 一共分为 6 个阶段，每个细节具体如下：

-   timers: 检查定时器，如果到了时间，就执行 setTimeout 和 setInterval 中到期的 callback。
-   pending callback: 上一轮循环中少数（I/O 异常回调）的 callback 会放在这一阶段执行。
-   idle, prepare: 仅在内部使用。
-   poll: 轮询，最重要的阶段，主线程收到异步做完的通知时，执行 pending callback，在适当的情况下回阻塞在这个阶段。
-   check: 执行 setImmediate(setImmediate()是将事件插入到事件队列尾部，主线程和事件队列的函数执行完成之后立即执行 setImmediate 指定的回调函数)的 - callback。
-   close callbacks: 执行 close 事件的 callback，例如 socket.on('close'[,fn])或者 http.server.on('close, fn)。
