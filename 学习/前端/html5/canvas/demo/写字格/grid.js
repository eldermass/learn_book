// 田字格

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.strokeStyle = 'rgb(210,19,10)'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(canvas.width, 0)
    ctx.lineTo(canvas.width, canvas.height)
    ctx.lineTo(0, canvas.height)
    ctx.closePath()
    ctx.stroke()
    // 虚线
    ctx.lineWidth = 1
    crossLine(0,0,canvas.width, canvas.height)
    crossLine(0,canvas.height,canvas.width,0)
    crossLine(0,canvas.height/2,canvas.width,canvas.height/2)
    crossLine(canvas.width/2,0,canvas.width/2,canvas.height)
    ctx.stroke()
    ctx.restore()
}
function crossLine(x1, y1, x2, y2) {
    let num = parseInt(canvas.width/5)
    let lx = (x2 - x1)/num
    let ly = (y2 - y1)/num
    for(let i = 0; i < num; i++){
        if(i%2 == 0){
            ctx.moveTo(x1 + lx * i,y1 + ly *i )
            ctx.lineTo(x1 + lx * (i+1), y1 + ly * (i+1))
        }
    }
}