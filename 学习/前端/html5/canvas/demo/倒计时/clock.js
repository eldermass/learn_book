// 画布像素大小
const WIDTH = 1280
let HEIGHT = 768
// 格子直径
const RADIUS = 20
// 左上偏移距离
let marginLeft = 100,
    marginTop = 50;

let nowTime = new Date();

let balls = [],
    colors = ['#33B5E5','#0099CC','#AA66CC','#9933CC','#99CC00','#669900','#FFBB33','FF8800','#FF4444','#CC00CC']

let timer = null
window.onload = function () {
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')
    canvas.width = WIDTH
    canvas.height = HEIGHT

    timer = setInterval(() => {
        render(ctx)
        update()
    }, 50)

    // 切换页面时，暂停动画
    window.addEventListener('focus', () => {
        clearInterval(timer)
        timer = setInterval(() => {
            render(ctx)
            update()
        }, 50)
    })
    window.addEventListener('blur', () => {
        clearInterval(timer)
    })
}

function update(){
    let nextTime = new Date()
    if(parseInt(nextTime/1000) != parseInt(nowTime/1000)){
        // 秒
        if(parseInt(nowTime.getSeconds()%10) != parseInt(nextTime.getSeconds()%10)){
            addBalls(marginLeft + 46*RADIUS, marginTop, parseInt(nowTime.getSeconds()%10))
        }
        if(parseInt(nowTime.getSeconds()/10) != parseInt(nextTime.getSeconds()/10)){
            addBalls(marginLeft + 38*RADIUS, marginTop, parseInt(nowTime.getSeconds()/10))
        }
        // 分
        if(parseInt(nowTime.getMinutes()%10) != parseInt(nextTime.getMinutes()%10)){
            addBalls(marginLeft + 27*RADIUS, marginTop, parseInt(nowTime.getMinutes()%10))
        }
        if(parseInt(nowTime.getMinutes()/10) != parseInt(nextTime.getMinutes()/10)){
            addBalls(marginLeft + 19*RADIUS, marginTop, parseInt(nowTime.getMinutes()/10))
        }
        // 时
        if(parseInt(nowTime.getHours()%10) != parseInt(nextTime.getHours()%10)){
            addBalls(marginLeft + 8*RADIUS, marginTop, parseInt(nowTime.getHours()%10))
        }
        if(parseInt(nowTime.getHours()/10) != parseInt(nextTime.getHours()/10)){
            addBalls(marginLeft + 0*RADIUS, marginTop, parseInt(nowTime.getHours()/10))
        }
        nowTime = nextTime
    }

    // 更新小球位置
    balls.forEach(ball => {
        ball.x += ball.vx
        ball.y += ball.vy
        ball.vy += ball.g
        if(ball.y > HEIGHT - RADIUS/2){
            ball.y = HEIGHT - RADIUS/2
            ball.vy = -ball.vy * 0.7
        }
    })
    // 清除离框小球
    let count = 0
    balls.forEach(ball => {
        if(ball.x + RADIUS > 0 && ball.x < WIDTH + RADIUS)
            balls[count++] = ball
    })
    while(balls.length > count){
        balls.pop()
    }
}

function addBalls(x, y ,num){
    let data = digit[num]
    for(let i = 0; i < data.length; i++)
        for(let j = 0; j < data[0].length; j++)
            if(data[i][j]){
                balls.push({
                    x: (2*j+1)*RADIUS/2 + x,
                    y: (2*i+1)*RADIUS/2 + y,
                    color: colors[Math.floor(Math.random()*colors.length)],
                    g: 1.5 + Math.random(),
                    vx: Math.random()*2 > 1 ? Math.random()*2 + 1 : -Math.random()*2 - 1 ,
                    vy: -Math.random()*4
                })
            }
}

function render(ctx){
    
    let hours = nowTime.getHours(),
        minutes = nowTime.getMinutes(),
        seconds = nowTime.getSeconds();
    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    drawNum(marginLeft, marginTop, parseInt(hours/10), ctx)
    drawNum(marginLeft + 8*RADIUS, marginTop, parseInt(hours%10), ctx)
    drawNum(marginLeft + 15*RADIUS, marginTop, 10, ctx) // 4行

    drawNum(marginLeft + 19*RADIUS, marginTop, parseInt(minutes/10), ctx)
    drawNum(marginLeft + 27*RADIUS, marginTop, parseInt(minutes%10), ctx)
    drawNum(marginLeft + 34*RADIUS, marginTop, 10, ctx) // 4行

    drawNum(marginLeft + 38*RADIUS, marginTop, parseInt(seconds/10), ctx)
    drawNum(marginLeft + 46*RADIUS, marginTop, parseInt(seconds%10), ctx)

    balls.forEach(val => {
        ctx.beginPath()
        ctx.arc(val.x, val.y, RADIUS/2, 0, 2*Math.PI)
        ctx.fillStyle = val.color
        ctx.fill()
        ctx.closePath()
    })
}

function drawNum(x, y, num, ctx){
    let r = RADIUS/2 // 小球占用格子半径
    let data = digit[num]
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[0].length; j++){
            if(data[i][j]){    
                ctx.beginPath()
                ctx.arc((2*j+1)*r+x, (2*i+1)*r+y, r-2, 0, 2*Math.PI)
                ctx.fillStyle = 'skyblue'
                ctx.fill()
                ctx.closePath()
            }
        }
    }
}