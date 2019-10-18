# es6 正则

## es6 中的命名捕获

1. (?<别名>) 在正则表达式中以这样的形势就能给子表达式取一个别名，以获得更好的代码可读性
    > 现在有一个字符串，'2018-09-06'，我需要分别获取他的年月日，以前的做法就是：

```js
let str = "2018-09-06";
let reg = /(\d{4})-(\d{2})-(\d{2})/;
let arr = str.match(reg);
let [year, month, day] = [arr[1], arr[2], arr[3]];
```

> 但是现在新版的 es 中提供了一个更加便于理解的方法,现在很多浏览器还不支持，新版谷歌可用

```js
let str = "2018-09-06";
let reg1 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

let arr = str.match(reg1);
let { year, month, day } = arr.groups;
```

## 命名捕获在 replace 中的使用

> 之前的做法

```js
let str = "2018-09-06";
let reg = /(\d{4})-(\d{2})-(\d{2})/;
let str1 = str.replace(reg, "$2/$3/$1");

console.log(str1); // 09/06/2018
```

> es2018 的做法

```js
let str = "2018-09-06";
let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
let newstr = str.replace(reg, "$<month>/$<day>/$<year>");

console.log(newstr); // 09/06/2018
```

> 当然 replace 的回掉函数方式也是可以实现的

```js
let str = "2018-09-06";
let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
let str2 = str.replace(reg, (...args) => {
    let { year, month, day } = args[args.length - 1];
    return `${year}/${month}/${day}`;
});
console.log(str2); // 2018/09/06
```

## 反向引用

1.以前反向引用子表达式的做法如下

```js
let str2 = "welcome-welcome-welcame";
let reg2 = /(welcome)(-)\1\2/;

console.log(str2.match(reg2)); // welcome-welcome-
```

2.新 es 标准里可以通过命名捕获来反向引用, 只需要 \k<别名>就好了

```js
let str2 = "welcome-welcome-welcame";
let reg2 = /(?<wel>welcome)-\k<wel>-/;

console.log(str2.match(reg2)); // welcome-welcome-
```
