let isInSelect = false
let lastPosition = {x:0, y:0}

canvas.onmousemove = function (e) {
    isInSelect = checkIsIn(e)
}

canvas.onmousedown = function (e) {
    lastPosition.x = e.clientX - canvas.getBoundingClientRect().left
    lastPosition.y = e.clientY - canvas.getBoundingClientRect().top
    
    if(isInSelect){
        canvas.onmousemove = function (e) {
            let curPosition = {
                x: e.clientX - canvas.getBoundingClientRect().left,
                y: e.clientY - canvas.getBoundingClientRect().top
            }
            let x = curPosition.x - lastPosition.x,
                y = curPosition.y - lastPosition.y
            switch(isInSelect){
                case 'inrect':
                    moveSelect(x, y)
                    break;
                case 'onponit-w':
                    moveLeft(x, y)
                    break;
                case 'onponit-n':
                    moveTop(x, y)
                    break;
                case 'onponit-s':
                    moveDown(x, y)
                    break;
                case 'onponit-e':
                    moveRight(x, y)
                    break;
                case 'onponit-se':
                    moveDown(x, y)
                    moveRight(x, y)
                    break;
                case 'onponit-ne':
                    moveTop(x, y)
                    moveRight(x, y)
                    break;
                case 'onponit-sw':
                    moveDown(x, y)
                    moveLeft(x, y)
                    break;
                case 'onponit-nw':
                    moveTop(x, y)
                    moveLeft(x, y)
                    break;
            }
            initCanvas()
            lastPosition = curPosition
        }
    }
}

canvas.onmouseup = function () {
    canvas.onmousemove = function (e) {
        isInSelect = checkIsIn(e)
    }
}

function moveRight(x, y){
    sp.width += x
}
function moveLeft(x, y){
    sp.x += x
    sp.width -= x
}
function moveTop(x, y){
    sp.y += y
    sp.height -= y
}
function moveDown(x, y){
    sp.height += y
}

function moveSelect(x, y){
    sp.x += x
    sp.y += y
}


function checkIsIn(e){
    let x = e.clientX - canvas.getBoundingClientRect().left
    let y = e.clientY - canvas.getBoundingClientRect().top
    let type = isOnPonit(x, y)
    if(type){
        canvas.style.cursor = type + '-resize'
        return 'onponit-' + type
    }
    drawSelectRect(sp.x, sp.y, sp.width, sp.height)
    if(ctx.isPointInPath(x, y)){
        canvas.style.cursor = "move"
        return 'inrect'
    }else{ 
        canvas.style.cursor = 'default'
        return false
    }
}
function isOnPonit(x, y) {
    for(let point of points){
        ctx.beginPath()
        selectPoint(point.x, point.y)
        ctx.closePath()
        if(ctx.isPointInPath(x, y)){
            return point.type
        }
    }
    return false
}