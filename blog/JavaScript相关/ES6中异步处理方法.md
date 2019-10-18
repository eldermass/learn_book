# 异步处理

## generator 函数

1. 可用于解决异步的深度嵌套，函数与函数名间加上\* 就能成为 generator 函数,next() 依次执行 yield 域，return 后结束

```js
function* show() {
    yield "welcome";
    yield "to";
    return "toilet";
}
let a = show();
console.log(a.next()); // {value: "welcome", done: false}
console.log(a.next()); // {value: "to", done: false}
console.log(a.next()); // {value: "toilet", done: true}
```

2.可以遍历 generator 函数的实例，只不过不会遍历到 return 的值

```js
function* show() {
    yield "welcome";
    yield "to";
    return "toilet";
}
let a = show();
// 循坏
for (let val of a) {
    console.log(val);
    //没有return 的值
}
// 可解构获取值
let [c, ...d] = show();
```

3.例子

```html
<script src="https://cdn.bootcss.com/axios/0.18.0/axios.min.js"></script>
<script>
    function* gen() {
        let val = yield "riseupcy";
        yield axios.get(`https://api.github.com/users/${val}`);
        return "over";
    }
    let g = gen();

    console.log(g.next());
    console.log(
        g.next().value.then(res => {
            console.log(res);
        })
    );
    // 可以控制触发函数的时机，next函数的传值，就是之后的value值
    setTimeout(() => {
        console.log(g.next());
    }, 2000);
</script>
```

## Async Await

1.async 可以让一个普通的函数变为 promise 对象

```js
async function fn() {
    throw new Error("wrong bbb");
}
fn()
    .then(res => {
        console.log("res = " + res);
    })
    .catch(err => {
        console.log(err);
    });
```

2.await 配合 async 使用可以使异步函数同步执行

```js
function get() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("something");
        }, 1000);
    });
}

async function show() {
    let res = await get();
    // 之后的函数都会等待get执行完毕
    console.log(res);
    console.log("after");
}

show();
```

3.在 async 函数中，其中一个 await 后的执行出错，之后的函数就不会执行

```js
async function fn1() {
    await Promise.reject("出问题了");
    // 这里出错，之后的代码就不会执行
    let a = await Promise.resolve("成功了");
    console.log(a);
}
fn1();
```

> 捕获错误可以解决这个问题

```js
async function fn1() {
    await Promise.reject("2出问题了").catch(err => {
        console.log(err);
    });
    let a = await Promise.resolve("2成功了");
    console.log(a);
}
fn1();
```

> try catch 也行

```js
async function fn() {
    try {
        await Promise.reject("出错了");
    } catch (e) {}
    //前面的代码错误，不影响后续执行
    let a = await Promise.resolve("bbb");
    return a;
}
fn();
```

4.应用实例

```html
<script src="https://cdn.bootcss.com/axios/0.18.0/axios.min.js"></script>
<script>
    async function getData(username) {
        let res = await axios.get(`https://api.github.com/users/${username}`);
        let img = document.createElement("img");
        img.src = res.data.avatar_url;
        document.body.appendChild(img);
        console.log("图片装在完毕" + img.src);
    }
    getData("riseupcy");
</script>
```
