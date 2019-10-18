# 关于数组的函数

## map

1. map 遍历方法的回调函数里有三个参数，(val, index, all)，分别代表值、下标、被循环的数组。

```javascript
let arr = [
    { title: "new1", read: 200, hot: true },
    { title: "new2", read: 300, hot: true },
    { title: "new3", read: 400, hot: true }
];
let newarr = arr.map((val, index, all) => {
    return {
        t: `^_^${val.title}`,
        r: val.read + 50,
        h: val.hot == true && "yeah!"
    };
});
console.log(newarr);
```

2.filter 过滤方法

```javascript
let arr = [
    { title: "new1", read: 200, hot: true },
    { title: "new2", read: 300, hot: false },
    { title: "new2", read: 300, hot: false },
    { title: "new3", read: 400, hot: true }
];
let newarr = arr.filter((val, index, a) => {
    return val.hot; //表达式中，返回结果为true的就留下来
});
console.log(newarr);
```

3.forEach 遍历没有返回值,map 有

```javascript
newarr.forEach((val, index, a) => {
    document.write(`${val.title}--${val.read}--${val.hot}<br>`);
});
```

4.some 类似于查找,含有某个条件就返回 true

```javascript
let arr = ["apple", "banana", "pear"];
let b = arr.some((val, index, a) => {
    return "apple";
});
console.log(b); // 结果为true
```

5.every 检验数组中每一个值是否都符合条件

```javascript
let arr2 = [1, 3, 5, 7, 9];
let c = arr2.every((val, index, a) => {
    return val % 2 == 1;
});
console.log(c); // 结果为true
```

6.reduce 用于数组前后项有一定联系时

```javascript
//求和
let a = arr.reduce((prev, cur, index, arr) => {
    return prev + cur;
});

//求阶乘
let b = arr.reduce((prev, cur, index, arr) => {
    return prev * cur;
});
```

7.reduceRight 同上，反方向

```javascript
let arr = [2, 2, 3];
let e = arr.reduceRight((prev, cur, index, arr) => {
    return prev ** cur;
});
e; // 81
```

8.find 找出第一个符合条件的 value，如果没有找到就是 undefined

```javascript
let arr = [2, 5, 40, 19, 7];
let res = arr.find((val, index, arr) => {
    return val > 15; //40先出来，所以结果是40
});
console.log(res); // 40
```

9.Array.findIndex()同上，找的是 index

```javascript
let arr = [2, 5, 40, 19, 7];
let res = arr.findIndex((val, index, arr) => {
    return val > 15; //40先出来，40的index为 2
});
console.log(res); // 2
```

10.arr.includes()检查是否包含

```javascript
let arr = [1, 5, 3, 6, 8];
let c = arr.includes(3);
console.log(c);
$1bash;
```

11.from 生成数组，可用于类数组转数组

```javascript
function show() {
    let arr = [...arguments];
    let arr = Array.from(arguments);
    //镜像拷贝数组后，就可以进行数组操作
    let last = arr.pop();
    arr.unshift(last);
    console.log(arr);
}
show(1, 2, 3, 4, 5);
```
