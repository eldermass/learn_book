let str = "中国";
// 简单的加密和解密
function enCode(str) {
  let key = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let l = key.length;
  let arr = key.split("");
  let s = "", b, b1, b2, b3;
  for (let i = 0; i < str.length; i++) {
    b = str.charCodeAt(i);
    b1 = b % l;         // 第一个余数 5
    b = (b - b1) / l;   // 328
    b2 = b % l;         // 第二个余数 23
    b = (b - b2) / l;   // 5
    b3 = b % l;         // 第三个余数 5{2}
    s += arr[b3] + arr[b2] + arr[b1];
  }
  return s
}

function deCode(code) {
  let key = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let l = key.length;
  let s, b, b1, b2, b3, d = 0;
  s = new Array(Math.floor(code.length / 3)); // 计算code加密前的长度
  b = s.length;
  for (let i = 0; i < b; i++) {
    b1 = key.indexOf(code.charAt(d)); // 第三个余数 5{2}
    d++;
    b2 = key.indexOf(code.charAt(d)); // 第二个余数 23
    d++;
    b3 = key.indexOf(code.charAt(d)); // 第一个余数 5
    d++;
    s[i] = b1 * l * l + b2 * l + b3;
  }
  return String.fromCharCode.apply(null, s);
}
console.log(deCode(enCode(str)));