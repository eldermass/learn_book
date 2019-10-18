const HEIGHT = Math.min(500, window.screen.availWidth - 20)
const WIDTH = Math.min(500, window.screen.availWidth - 20)

let canvas = document.getElementById('canvas')
canvas.height = HEIGHT
canvas.width = WIDTH
let ctx = canvas.getContext('2d')

let lineWidth = 2
let lineColor = 'skyblue'
let lastPos = {x:0, y:0, width:lineWidth, time:0}


drawGrid() // 田字格



canvas.onmousedown = function (e) {
    e.preventDefault()
    beginStroke({x:e.clientX, y:e.clientY})
}
canvas.onmouseout = () => {endStroke()}
// 移动端
canvas.ontouchstart = (e) => {
    e.preventDefault()
    let touches = e.touches[0]
    beginStroke({x:touches.clientX, y:touches.clientY})
}

function beginStroke(point) {
    // 设置位置
    let p = canvas.getBoundingClientRect()
    lastPos.x = point.x - p.left
    lastPos.y = point.y - p.top

    canvas.onmousemove = (e) => {
        e.preventDefault()
        moveStroke({x:e.clientX, y:e.clientY})
    }
    canvas.onmouseup = () => {endStroke()}
    // 移动端
    canvas.ontouchmove = (e) => {
        e.preventDefault()
        let touches = e.touches[0]
        moveStroke({x:touches.clientX, y:touches.clientY})
    }
    canvas.ontouchend = () => { endStroke() }
}
function endStroke() {
    canvas.onmousemove = null
    canvas.onmouseup = null
    // 移动端
    canvas.ontouchmove = null
    canvas.ontouchend = null
}

function moveStroke(point) {
    let p = canvas.getBoundingClientRect()
    let nowPos = {
        x: point.x - p.left,
        y: point.y - p.top,
        time: new Date().getTime(),
        width: 1
    }
    
    let lineWidth = getLineWidth(getDistance(nowPos, lastPos), getIntervalTime(nowPos.time, lastPos.time))
    lineWidth = 2/3 * lastPos.width + 1/3 * lineWidth
    nowPos.width = lineWidth
    
    ctx.beginPath()
    ctx.strokeStyle = lineColor
    ctx.lineCap = 'round'    
    ctx.lineJoin = 'round'
    ctx.lineWidth = lineWidth
    ctx.lineTo(lastPos.x, lastPos.y)
    ctx.lineTo(nowPos.x, nowPos.y)
    ctx.stroke()

    lastPos = nowPos
}


function getLineWidth(s ,t){
    let maxWidth = lineWidth
    let minWidth = 1
    let width = minWidth
    let v = s/t
    if(v < 0.1)
        width = maxWidth
    else if(v > 6)
        width = minWidth
    else 
        width = maxWidth - (v - 0.1)/(6 - 0.1) * (maxWidth - minWidth)
    return width
}

function getIntervalTime(curTime, lastTime){
    return curTime - lastTime
}
function getDistance( curLoc, lastLoc ){
    return Math.sqrt((lastLoc.x - curLoc.x) * (lastLoc.x - curLoc.x) + (lastLoc.y - curLoc.y) * (lastLoc.y - curLoc.y))
}




// 交互
function changeWidth(num) {
    if(/[0-9]+/.test(num)){
        lineWidth = parseInt(num)
    }
}
function changeColor( color ){
    lineColor = color
} 
function cusColor(str){
    lineColor = str
}