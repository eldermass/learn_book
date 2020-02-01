const HEIGHT = window.innerHeight -10
const WIDTH = window.innerWidth
const RADIUS = parseInt(WIDTH/72/2) // 格子边长一半
const MARGIN_TOP = 120
const MARGIN_LEFT = 9*RADIUS*2
let timer = null

class Countdown{
    constructor(el, countTime = 0){
        let canvas = document.querySelector(el)
        canvas.height = HEIGHT
        canvas.width = WIDTH
        this.ctx = canvas.getContext('2d')
        // 球半径
        this.radius = RADIUS - 2
        // 运动的球
        this.balls = []
        // 色彩
        this.colors = ['#33B5E5','#0099CC','#AA66CC','#9933CC','#99CC00','#669900','#FFBB33','FF8800','#FF4444','#CC00CC']
        // 时间
        this.time = {hours:0, minutes:0, seconds: 0}
        if(countTime){
            this.timeLine = new Date().getTime() + countTime
            this.initCount()
        }else{
            this.init()
        }
    }
    init(){
        clearInterval(timer)
        timer = setInterval(() => {
            this.render()
            this.update()
        }, 50)
    }
    update(){
        let date = new Date()
        if(date.getHours() != this.time.hours){
            // 十位
            if(parseInt(date.getHours()/10) != parseInt(this.time.hours/10)){
                this.addBalls(0, 0, parseInt(this.time.hours/10))
            }
            // 个位
            if(parseInt(date.getHours()%10) != parseInt(this.time.hours%10)){
                this.addBalls(8*2*RADIUS, 0, parseInt(this.time.hours%10))
            }
        }
        if(date.getMinutes() != this.time.minutes){
            if(parseInt(date.getMinutes()/10) != parseInt(this.time.minutes/10)){
                this.addBalls(19*2*RADIUS, 0, parseInt(this.time.minutes/10))
            }
            if(parseInt(date.getMinutes()%10) != parseInt(this.time.minutes%10)){
                this.addBalls(27*2*RADIUS, 0, parseInt(this.time.minutes%10))
            }
        }
        if(date.getSeconds() != this.time.seconds){
            if(parseInt(date.getSeconds()/10) != parseInt(this.time.seconds/10)){
                this.addBalls(38*2*RADIUS, 0, parseInt(this.time.seconds/10))
            }
            if(parseInt(date.getSeconds()%10) != parseInt(this.time.seconds%10)){
                this.addBalls(46*2*RADIUS, 0, parseInt(this.time.seconds%10))
            }
        }
        // 更新时间
        this.time.hours = date.getHours()
        this.time.minutes = date.getMinutes()
        this.time.seconds = date.getSeconds()

        // 更新小球位置
        this.balls.forEach(ball => {
            ball.x += ball.vx;
            ball.y += ball.vy;
            ball.vy += ball.g 
            if(ball.y > HEIGHT - RADIUS + 2){
                ball.y = HEIGHT - RADIUS + 2
                ball.vy = -ball.vy*0.6
            }
        })
        // 清理离框小球
        let count = 0
        this.balls.forEach(ball => {
            if(ball.x > 0 && ball.x <WIDTH)
                this.balls[count++] = ball
        })
        while(this.balls.length > count)
            this.balls.pop()
    }
    render(){
        let {hours, minutes, seconds} = this.time;

        // 清理画布
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT)
        // 绘制时间
        this.drawNum(0, 0, parseInt(hours/10))
        this.drawNum(8*2*RADIUS, 0, parseInt(hours%10))

        this.drawNum(15*2*RADIUS, 0, 10)        
        this.drawNum(19*2*RADIUS, 0, parseInt(minutes/10))
        this.drawNum(27*2*RADIUS, 0, parseInt(minutes%10))
        
        this.drawNum(34*2*RADIUS, 0, 10)
        this.drawNum(38*2*RADIUS, 0, parseInt(seconds/10))
        this.drawNum(46*2*RADIUS, 0, parseInt(seconds%10))
        // 绘制球
        for(let i = 0; i < this.balls.length; i++){
            this.drawArc(this.balls[i].x, this.balls[i].y, this.balls[i].color)
        }
    }
    addBalls(x, y, num){
        let data = digit[num],
            colors = this.colors
        for(let i = 0; i < data.length; i++){
            for(let j = 0; j < data[0].length; j++){
                if(data[i][j]){
                    this.balls.push({
                        x: 2*RADIUS*j+RADIUS + x + MARGIN_LEFT,
                        y: 2*RADIUS*i+RADIUS + y + MARGIN_TOP,
                        color: colors[Math.floor(Math.random()*colors.length)],
                        g: 1.5 + Math.random(),
                        vx: Math.random()*2 > 1 ? Math.random()*2 + 2 : -Math.random()*2 - 2 ,
                        vy: -Math.random()*4
                    })
                }
            }
        }
    }
    drawNum(x, y, num){
        let data = digit[num]
        for(let i = 0; i < data.length; i++){
            for(let j = 0; j < data[0].length; j++){
                if(data[i][j]){
                    this.drawArc(2*RADIUS*j+RADIUS + x + MARGIN_LEFT, 2*RADIUS*i+RADIUS + y + MARGIN_TOP, 'skyblue')
                }
            }
        }
    }
    drawArc(x, y, color){
        let { ctx, radius } = this
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        ctx.closePath()
    }
    initCount(){
        clearInterval(timer)
        // 倒计时用
        timer = setInterval(() => {
            this.render()
            this.updateCount()
        }, 50)
    }
    updateCount(){
        let date = new Date()
        let lastTime = this.timeLine - date.getTime() > 0 ?
                        parseInt((this.timeLine - date.getTime())/1000) : 0
        
        let hours = parseInt(lastTime/3600),
            minutes = parseInt((lastTime - hours*3600)/60),
            seconds = parseInt(lastTime%60)
            
        if(hours != this.time.hours){
            // 十位
            if(parseInt(hours/10) != parseInt(this.time.hours/10)){
                this.addBalls(0, 0, parseInt(this.time.hours/10))
            }
            // 个位
            if(parseInt(hours%10) != parseInt(this.time.hours%10)){
                this.addBalls(8*2*RADIUS, 0, parseInt(this.time.hours%10))
            }
        }
        if(minutes != this.time.minutes){
            if(parseInt(minutes/10) != parseInt(this.time.minutes/10)){
                this.addBalls(19*2*RADIUS, 0, parseInt(this.time.minutes/10))
            }
            if(parseInt(minutes%10) != parseInt(this.time.minutes%10)){
                this.addBalls(27*2*RADIUS, 0, parseInt(this.time.minutes%10))
            }
        }
        if(seconds != this.time.seconds){
            if(parseInt(seconds/10) != parseInt(this.time.seconds/10)){
                this.addBalls(38*2*RADIUS, 0, parseInt(this.time.seconds/10))
            }
            if(parseInt(seconds%10) != parseInt(this.time.seconds%10)){
                this.addBalls(46*2*RADIUS, 0, parseInt(this.time.seconds%10))
            }
        }
        // 更新时间
        this.time.hours = hours
        this.time.minutes = minutes
        this.time.seconds = seconds

        // 更新小球位置
        this.balls.forEach(ball => {
            ball.x += ball.vx;
            ball.y += ball.vy;
            ball.vy += ball.g 
            if(ball.y > HEIGHT - RADIUS + 2){
                ball.y = HEIGHT - RADIUS + 2
                ball.vy = -ball.vy*0.6
            }
        })
        // 清理离框小球
        let count = 0
        this.balls.forEach(ball => {
            if(ball.x > 0 && ball.x <WIDTH)
                this.balls[count++] = ball
        })
        while(this.balls.length > count)
            this.balls.pop()
    }
}

// 时钟
// new Countdown('#canvas')

// 倒计时
new Countdown('#canvas')
