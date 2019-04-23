let flag = true
function draw(){
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')
    let img = new Image()
    img.src = './assets/img/1.png'
    img.onload = function (){
        ctx.drawImage(img,0,0,200,200)
        let imageData = ctx.getImageData(0,0,200,200)
        let newpx = calculate(imageData)
        //重绘canvas
        ctx.translate(100,100)
       reDraw(ctx,newpx)
    }
}
draw()
function calculate(imageData){
    let particles = [] //存储坐标
    let data = imageData.data 
    let cols = imageData.width,rows = imageData.height
    let pos = [] //临时存放位置
    for(let i = 1 ; i <= cols;i++){
        for(let j = 1;j <= rows;j++){
            pos = ((j - 1)*cols + (i-1))*4
            if(data[pos] > 100 || data[pos+1] > 100 || data[pos+2] > 100){
                let particle = {
                    x: i + (Math.random()-0.5) * 30,
                    y: j + (Math.random()-0.5) * 30,
                    fillStyle:`rgba(${data[pos]},${data[pos+1]},${data[pos+2]},${data[pos+3]})`
                }
                particles.push(particle)
            }
        }
    }
    return particles
}
//重绘
function reDraw(ctx,newpx,per = 0){
    if(per <= 0.8 && flag){
        ctx.rotate(per)
        per += 0.02 
        ctx.clearRect(-100,-100,200,200)
        let len = newpx.length
        for(let i = 0; i<len;i++){
            let currP = newpx[i]//当前粒子
            ctx.fillStyle = currP.fillStyle
            ctx.fillRect((currP.x-100)*per,(currP.y-100) * per,1,1)
        }
        setTimeout(function(){
            reDraw(ctx,newpx,per)
        },20)
    }else if(per <= 2 && per >0.5){
        ctx.rotate(per)
        per -= 0.02 
        ctx.clearRect(-100,-100,200,200)
        let len = newpx.length
        for(let i = 0; i<len;i++){
            let currP = newpx[i]//当前粒子
            ctx.fillStyle = currP.fillStyle
            ctx.fillRect((currP.x-100)*per,(currP.y-100) * per,1,1)
        }
        setTimeout(function(){
            reDraw(ctx,newpx,per)
        },20)
        flag = false
    }else{
        per = 0.5 
        ctx.rotate(per/5)
        ctx.clearRect(-100,-100,200,200)
        let len = newpx.length
        for(let i = 0; i<len;i++){
            let currP = newpx[i]//当前粒子
            ctx.fillStyle = currP.fillStyle
            ctx.fillRect((currP.x-100)*per,(currP.y-100) * per,1,1)
        }
        setTimeout(function(){
            reDraw(ctx,newpx,per)
        },20)
    }
        
}

//缓动函数
function easeInOut(t,b,c,d){
    t /= d/2;
    if(t<1)return c/2*Math.pow(2,10*(t-1))+b;
    t--;
    return c/2*(-Math.pow(2,-10*t)+2)+b;
}
