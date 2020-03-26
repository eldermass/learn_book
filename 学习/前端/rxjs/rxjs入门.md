# RXJS

[入门](https://www.jianshu.com/p/bc4d8ce267d1)

## 使用

> rxjs 里的四个执行过程  
> Creating Observables 创建一个 Ob  
> Subscribing to Observables 订阅 Ob  
> Executing the Observable 执行 Ob  
> Disposing Observables 处置 Ob

### 创建一个 Ob

Observables are created using new Observable or a creation operator

```js
// 使用 Ob类 创建一个流， 一般都使用 of, from 这样的创建器创建流
let { of, Observable, from } = rxjs;

let ob = new Observable(subscribe => {
    // 这是一个数据流
    subscribe.next(1);
    subscribe.next(2);
    setTimeout(() => {
        subscribe.next(3);
        subscribe.complete();
    }, 1000);
});
```

### 订阅 Ob

```js
// 这里开始订阅
ob.subscribe(x => console.log(x));

// 完整的订阅方法
ob.subscribe({
    next: value => {
        console.log("got a value " + value);
    },
    error: err => {
        console.log("ob error", err);
    },
    complete: () => {
        console.log("it is over");
    }
});
```

### 执行 Ob

There are three types of values an Observable Execution can deliver:

"Next" notification: sends a value such as a Number, a String, an Object, etc.
"Error" notification: sends a JavaScript Error or exception.
"Complete" notification: does not send a value.

```js
let ob = new Observable(function subscribe(subscriber) {
    try {
        subscriber.next(1);
    } catch (err) {
        subscriber.error(err); // delivers an error if it caught one
    }
});
```

### 处理 Ob

Because Observable Executions may be infinite, and it's common for an Observer to want to abort execution in finite time, we need an API for canceling an execution. Since each execution is exclusive to one Observer only, once the Observer is done receiving values, it has to have a way to stop the execution, in order to avoid wasting computation power or memory resources.

```js
let ob = from(1, 2)
const subscription = ob.subscribe(x => console.log(x));
// Later: 取消订阅
subscription.unsubscribe();
```
