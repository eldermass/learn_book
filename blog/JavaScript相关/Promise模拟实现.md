# 模拟 Promise

1. 模拟 Promise 的基础实现，加深对 Promise 的理解

```js
class Promise2 {
    constructor(fn) {
        let _this = this;
        this.state = "";
        this.res_success = null;
        this.res_error = null;
        this.queue = [];
        fn(
            (...args) => {
                _this.state = "success";
                _this.res_success = args;
                _this.queue.forEach(val => {
                    val.fn1(...args);
                });
            },
            (...args) => {
                _this.state = "error";
                _this.res_error = args;
                _this.queue.forEach(val => {
                    val.fn2(...args);
                });
            }
        );
    }
    then(fn1, fn2) {
        if (this.state == "success") {
            fn1(...this.res_success);
        } else if (this.state == "error") {
            fn2(...this.res_error);
        } else {
            //在没界定状态前，先储存函数
            this.queue.push({ fn1, fn2 });
        }
    }
}
```

> 测试一下代码

```js
let p = new Promise2((resolve, reject) => {
    setTimeout(() => {
        resolve(123);
    }, 1000);
});

p.then(res => {
    console.log(res);
});
```

## 2. 模拟一下 Promise.all 的实现

```js
Promise2.all = function(arr) {
    let result = [];
    return new Promise2(function(resolve, reject) {
        let i = 0;
        next();
        function next() {
            arr[i].then(function(res) {
                result.push(res);
                i++;
                if (i == arr.length) {
                    resolve(result);
                } else {
                    next();
                }
            }, reject);
        }
    });
};
```

> 测试 promise.all

```js
let p1 = new Promise2((resolve, reject) => {
    setTimeout(() => {
        resolve(11);
    }, 1000);
});
let p2 = new Promise2((resolve, reject) => {
    setTimeout(() => {
        resolve(22);
    }, 1000);
});
Promise2.all([p1, p2]).then(res => {
    console.log(res);
});
```
