# RXJS

[入门](https://www.jianshu.com/p/bc4d8ce267d1)  
[官方文档](https://rxjs-dev.firebaseapp.com/guide/overview)  
[vue-rx入门](https://zhuanlan.zhihu.com/p/98960192) 或 [笔记](./vue-rx入门.md)

## 一、基本原理

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
let ob = from(1, 2);
const subscription = ob.subscribe(x => console.log(x));
// Later: 取消订阅
subscription.unsubscribe();
```

## 二、操作符

操作符有两大类：管道操作符、创建操作符

1. A Pipeable Operator is a function that takes an Observable as its input and returns another Observable

2. Creation Operators are the other kind of operator, which can be called as standalone functions to create a new Observable

```js
// 管道操作符 改造并生成一个新的 Ob 实例
// observableInstance.pipe(operator())
map(x => x * x)(of(1, 2, 3)).subscribe(v => {
    console.log(`value: ${v}`);
});

first()(of(1, 2, 3)).subscribe(v => {
    console.log(`value: ${v}`);
});

// 管道操作 用于连接多个操作
// obs.pipe(op1(), op2(), op3(), op3());
of(1, 2, 3)
    .pipe(
        map(x => x * x),
        first()
    )
    .subscribe(v => console.log(`value: ${v}`));
```

```js
// 创建操作符，用于创建一个新的 Ob 实例
// Of(1, 2, 3) 或 from() 等
```

操作符非常的多，不够用的时候也可以创建自定义的操作符

```js
// Use the pipe() function to make new operators
function discardOddDoubleEven() {
    return pipe(
        filter(v => !(v % 2)),
        map(v => v + v)
    );
}

of(1, 2, 3, 4, 5, 6)
    .pipe(discardOddDoubleEven())
    .subscribe(x => console.log(x));

// Creating new operators from scratch
// 看文档
```

### Subscription

调用 unsubscribe() add(ChildSubscription) remove(ChildSubscription) 清理订阅者

### Subject

An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. 这里有许多衍生出来的 Subject ，例如 BehaviorSubject, ReplaySubject, AsyncSubject

```js
// 1. 就像 EventEmitters 一样，需要先订阅，然后在通知数据。可以同时广播到多个订阅者
const subject = new Subject();

subject.subscribe({
    next: v => console.log(`observerA: ${v}`)
});
subject.subscribe({
    next: v => console.log(`observerB: ${v}`)
});

subject.next(1);
subject.next(2);

// 2. Subject is an Observers
const subject = new Subject();

subject.subscribe({
    next: v => console.log(`observerA: ${v}`)
});
subject.subscribe({
    next: v => console.log(`observerB: ${v}`)
});

const ob = from([1, 2, 3]).subscribe(subject);
// 会将subject里的两次订阅操作合并为同一个，输出顺序 112233

// 3. 广播到多个观察者
const source = from([1, 2, 3]);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));

// These are, under the hood, `subject.subscribe({...})`:
multicasted.subscribe({
    next: v => console.log(`observerA: ${v}`)
});
multicasted.subscribe({
    next: v => console.log(`observerB: ${v}`)
});

// This is, under the hood, `source.subscribe(subject)`:
multicasted.connect();

// 4. connect 开始广播
const source = interval(1000);
const subject = new Subject();

const mulitcasted = source.pipe(multicast(subject));

let s1 = mulitcasted.subscribe(x => console.log("A: " + x));
let s2;

let connect = mulitcasted.connect(); // 关键的一步，开始广播
// refCount操作符， 可以是这一步自动检测，并开始

setTimeout(() => {
    s2 = mulitcasted.subscribe(y => console.log("BBBBB: " + y));
}, 2500);

// 清理
setTimeout(() => {
    s2.unsubscribe();
}, 5000);

setTimeout(() => {
    s1.unsubscribe();
    connect.unsubscribe();
}, 8000);
```

### Scheduler

调度程序控制订阅何时启动以及何时发送通知, 由三部分组成。

```js
const s = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
}).pipe(observeOn(asyncScheduler));

console.log("first");
s.subscribe(x => console.log("got a value: " + x));
console.log("last");
```
