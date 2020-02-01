# canvas 绘制验证码

在几乎每个网站登陆都会使用验证码来防止机器等非人操作，防止数据库被轻而易举的攻破。  
验证码一般是 PHP 或 java 等生成的图片。在前端，用 canva 或 SVG 也可以绘制验证码；

## 以下是用 canvas 生成验证码的方法

> 我将该方法简单的封装成了 Verify 类，只需要传入 canvas 元素的类名或者 id，就能初始化 canvas

1. html 结构如下

```html
<canvas id="canvas" width="120" height="40">
    你的浏览器也太歪了
</canvas>
```

2.js 结构如下

```js
class Verify {
    constructor({ el, width, height, len, lines, dots }) {
        //参数分别为canvas 元素， 绘制区域宽高， 验证字符个数 ,干扰线数量，干扰点数量
        this.el = document.querySelector(el);
        this.width = width || this.el.offsetWidth;
        this.height = height || this.el.offsetHeight;
        this.len = len || Math.floor(this.el.offsetWidth / 30);
        this.lines = lines || 5;
        this.dots = dots || 40;
        this.code = "";
        this.init();
    }
    init() {
        this.draw();
        this.el.onclick = e => {
            e.preventDefault();
            this.draw();
        };
    }
    draw() {
        let { width, height } = this;
        //开始绘制
        let ctx = this.el.getContext("2d");
        //填充背景色
        ctx.fillStyle = this.makeColor(150, 240);
        ctx.fillRect(0, 0, width, height);

        //填充字符
        let chars = this.makeCode();
        for (let i = 0; i < this.len; i++) {
            ctx.save();
            ctx.font = chars[i].fontSize + "px Simhei";
            ctx.fillStyle = this.makeColor(80, 120);
            ctx.translate(25 * i + 25, 25);
            ctx.rotate((chars[i].deg * Math.PI) / 180);
            ctx.fillText(chars[i].str, -10, 8);
            ctx.restore();
        }
        //生成干扰线
        this.makeLine(ctx, this.lines);

        //生成干扰点
        this.makeDot(ctx, this.dots);
    }
    makeCode() {
        //生成验证码
        let strs = [];
        this.code = "";
        let pool = "ABCDEFGHIJKLIMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwxyz1234567890";
        for (let i = 0; i < this.len; i++) {
            let str = pool[this.makeNum(0, pool.length - 1)];
            this.code += str;
            let fontSize = this.makeNum(20, 40);
            let deg = this.makeNum(-35, 35);
            strs.push({ str, fontSize, deg });
        }
        return strs;
    }
    makeLine(ctx, lines) {
        let { makeNum, width, height } = this;
        //添加干扰线
        for (let i = 0; i < lines; i++) {
            ctx.beginPath();
            ctx.moveTo(makeNum(0, width), makeNum(0, height));
            ctx.lineTo(makeNum(0, width), makeNum(0, height));
            ctx.strokeStyle = this.makeColor(140, 230);
            ctx.closePath();
            ctx.stroke();
        }
    }
    makeDot(ctx, dots) {
        let { makeNum, width, height } = this;
        //添加干扰点
        for (let i = 0; i < dots; i++) {
            ctx.beginPath();
            ctx.arc(makeNum(0, width), makeNum(0, height), makeNum(1, 2), 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = this.makeColor(150, 200);
            ctx.fill();
        }
    }
    makeNum(min, max) {
        return Math.ceil(Math.random() * (max - min + 1) + min - 1);
    }
    makeColor(min, max) {
        let { makeNum } = this;
        return `rgb(${makeNum(min, max)}, ${makeNum(min, max)}, ${makeNum(min, max)})`;
    }
}
let v = new Verify({ el: "#canvas" });
//v.code 便是当前的验证码
console.log(v.code);
```

> 说明：Verify 类可以接收 el, width, height, len, lines, dots 等参数，分别表示 canvas 元素， 绘制区域宽高， 验证字符个数 ,干扰线数量，干扰点数量。如果没有传 len 参数，默认 canvas 元素每满 30px 长度便添加一个字符。
