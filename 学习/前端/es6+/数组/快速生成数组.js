// 快速生成 填充值的数组
[...Array.from(6).keys()]

Array.from(new Array(6).keys)

Array.from({length: 6}, (v, i) => i)

Array.from({length: 26}, (v, i) => String.fromCodePoint(i + 97))
// ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']