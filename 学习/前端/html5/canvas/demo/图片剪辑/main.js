const HEIGHT = 600
const WIDTH = 1000
let canvas = document.getElementById('canvas')
canvas.height = HEIGHT; canvas.width = WIDTH
let ctx = canvas.getContext('2d')
let selectedCan = document.getElementById('selected')
let selCtx = selectedCan.getContext('2d')

let points = []
let sp = {x:290, y:10, width:350, height:300}
let originData = ''
let blurData = ''

let image = new Image()
image.src = './10.jpg'
image.onload = function () {
    ctx.drawImage(image, 0, 0, image.width, image.height)
    blurData = ctx.getImageData(0, 0, image.width, image.height)
    originData = ctx.getImageData(0, 0, image.width, image.height)
    blurImg(blurData.data) 
    initCanvas()
}
function initCanvas() {
    drawBlurImage()
    drawSelectRect(sp.x, sp.y, sp.width, sp.height)
    strokeSelectRect()
    drawPoint(sp.x, sp.y, sp.width, sp.height)
    drawSelected()
}
function strokeSelectRect(){
    ctx.strokeStyle = '#fff'
    ctx.stroke()
    // 储存剪辑区
    ctx.save()
    ctx.clip()
    ctx.drawImage(image, 0, 0, image.width, image.height)
    ctx.restore()
}

function drawSelectRect(x, y, width, height){
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + width, y)
    ctx.lineTo(x + width, y + height)
    ctx.lineTo(x, y + height)
    ctx.lineTo(x, y)
}
function drawPoint(x, y, width, height){
    points[0] = {x: x, y: y, type: 'nw'}
    points[1] = {x: x + width, y: y, type: 'ne'}
    points[2] = {x: x + width/2, y: y, type: 'n'}
    points[3] = {x: x + width, y: y + height, type: 'se'}
    points[4] = {x: x + width/2, y: y + height, type: 's'}
    points[5] = {x: x + width, y: y + height/2, type: 'e'}
    points[6] = {x: x, y: y + height, type: 'sw'}
    points[7] = {x: x, y: y + height/2, type: 'w'}

    ctx.beginPath()
    for(let point of points){
        selectPoint(point.x, point.y)
    }
    ctx.fillStyle = '#fff'
    ctx.fill()
}
function selectPoint(x ,y){
    ctx.moveTo(x, y)
    ctx.arc(x, y, 3, 0, Math.PI*2)
}

function drawBlurImage() {
    ctx.putImageData(blurData, 0, 0)
}

function blurImg(imageData) {
    let temData = originData
    let blurR = 2
    let tolnum = (2 * blurR + 1) * (2 * blurR + 1)
    for(let i = blurR; i < temData.height - blurR; i++)
        for(let j = blurR; j < temData.width - blurR; j++){
            let tolR = 0, tolG = 0, tolB = 0;
            for(let x = -blurR; x <= blurR; x ++)
                for(let y = -blurR; y <= blurR; y++){
                    let p = (i + x)*temData.width + j + y
                    tolR += temData.data[4*p + 0]
                    tolG += temData.data[4*p + 1]
                    tolB += temData.data[4*p + 2]
                }
            let px = i * temData.width  + j
            imageData[4*px + 0] = tolR/tolnum
            imageData[4*px + 1] = tolG/tolnum
            imageData[4*px + 2] = tolB/tolnum
        }
}


function drawSelected(){
    selectedCan.width = sp.width
    selectedCan.height = sp.height
    selCtx.drawImage(image, sp.x, sp.y, sp.width, sp.height, 0, 0, sp.width, sp.height)
}