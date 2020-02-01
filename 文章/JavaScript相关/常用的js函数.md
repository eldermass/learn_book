# 常用 js 函数

> 学习了几种提高性能或优雅程度的函数

## 记忆函数

以一个阶乘的函数为例，这样的函数能缓存计算过的值，并直接返回，可以免去再次计算。

```js
let count = 0;
let cache = {};
function factorial(n) {
    if (cache[n]) {
        return cache[n];
    }
    count++;
    if (n == 1) {
        return 1;
    }
    cache[n] = n * factorial(n - 1);
    return cache[n];
}
```

> 用 count 记录函数的计算次数，由于记忆函数缓存了参数为 5 之前的计算，所以 count 为 7

```js
let num = factorial(5);
let num2 = factorial(7);
console.log(count, num, num2); // 7 120 5040
```

> 可以封装一个记忆的功能函数

```js
function memorize(fn) {
    let cache = {};
    return function() {
        let key = arguments.length + Array.prototype.join.call(arguments);
        if (cache[key]) {
            return cache[key];
        } else {
            // 只能用于一般函数，由于递归函数内部有调用自己的行为，这个函数并不能记录
            cache[key] = fn.apply(this, arguments);
            return cache[key];
        }
    };
}
```

> 以下是函数经过记忆后运行的例子,可以明显的发现，第二次运行时是几乎不花时间的

```js
function jie(n) {
    console.log(++count);
    if (n == 1) {
        return 1;
    }
    return n * jie(n - 1);
}
let j = memorize(jie);
console.time(1);
j(500);
console.timeEnd(1); //1: 1130.169ms
console.time(2);
j(500);
console.timeEnd(2); //2: 0.025ms
```

### 节流

在网站的交互过程中，有很多操作会被频繁的触发，这样就给浏览器和服务器带来了不小的负担。将一个函数的执行控制在一定的时间间隔外，就是节流的一种方式

> 将 log 函数控制再 1 秒钟内只能触发一次

```js
let lastTime = 0;
function log() {
    let nowTime = new Date();
    if (nowTime - lastTime > 1000) {
        console.log(11);
        lastTime = nowTime;
    }
}
for (let i = 0; i < 100; i++) {
    log();
}
```

> 封装一下就能更好的用于多个函数

```js
function throttle(fn, wait) {
    let lastTime = 0;
    return function() {
        let nowTime = new Date();
        if (nowTime - lastTime > wait) {
            lastTime = nowTime;
            fn.apply(this, arguments);
        }
    };
}
function log() {
    console.log(11);
}
document.onclick = throttle(log, 1000);
```

防抖

> 在停止连续操作一定时间后，才执行最近一次的操作。

```js
let timer = null;
function log() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        console.log("~~pq~~");
    }, 1000);
}
```

封装以后的就能用于多个函数

```js
<input type="text" id="text" onkeydown="newLog(this.value)">
```

```js
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
let newLog = debounce(str => {
    console.log(str);
}, 1000);
```

纯函数

单一变量
