# Map

> Map 是一种类似于 json 的数据格式，map 的键 key 可以是任意类型\*/

```js
let m = new Map();
// 添加
m.set(123, "abc")
    .set(234, "bcd")
    .set(456, "doh");
// 获取
m.get(123); // 'abc'
// 删除
m.delete(456);
// 判断是否有key
m.has(123); //true
// 清空
// m.clear()
// 遍历
for (let [key, val] of m.entries()) {
    console.log(`${key} -- ${val}`);
}
// 遍历
m.forEach((val, key) => {
    console.log(key, val);
});
```

> WeakMap

```js
{
    //weakmap的key只能是对象
    let m = new WeakMap();
    let json = { a: 1, b: 2 };
    m.set(json, 1);
    console.log(m);
}
```

> Set// 类似数组的数据结构 set 的值不能重复

```js
// set里放的是一个 数组
let s = new Set(["a", "b", "c", "d"]);
// 添加一个值
s.add("e");
// 删除
s.delete("b");
// 检测是否有
s.has("a"); //true
// 查看值
s.values();
// 长度
s.size;
// 清空
// s.clear()
for (let val of s) {
    console.log(`${val}`);
}
```

> set 特性可以用于数组的去重

```js
let arr = [1, 3, 2, 6, 5, 3, 2, 16, 5, 2, 3, 1, 6, 2, 3, 1];
let newarr = [...new Set(arr)];
```

> set 的相关操作

```js
//123  => 246
let set = new Set([1, 2, 3]);
let set2 = new Set([...set].map(val => val * 2));

//123456  => 246
let set3 = new Set([1, 2, 3, 4, 5, 6]);
let set4 = new Set([...set3].filter(val => val % 2 == 0));
```

> weakset 和 set 差不多

```js
// weakset
let wset = new WeakSet();
wset.add({ a: 1, b: 2 });
```
