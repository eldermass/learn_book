let container = document.getElementById('container')
let divs = document.getElementsByClassName('item')
let toggle = document.getElementById('toggle')
let input = document.getElementById('input')
let times = {hours:1,minutes:0,seconds:0}

divs[0].style.display = 'block'
divs[0].onmouseover = function () {
    for(let i = 1; i<divs.length; i++){
        divs[i].style.display = 'block'
    }
}
toggle.onmouseleave = function () {
    for(let i = 1; i<divs.length; i++){
        divs[i].style.display = 'none'
    }
}
// 切换
for(let i = 1; i < divs.length; i++){
    divs[i].onclick =(function (j) {
        return function(){
            // 时钟
            if(j == 1){
                divs[0].innerHTML = '时钟'
                container.innerHTML = ''
                let canvas = document.createElement('canvas')
                canvas.id = 'canvas'
                container.appendChild(canvas)

                new Countdown('#canvas')                        
            }
            // 倒计时
            if(j == 2){
                input.style.display = 'flex'

                // new Countdown('#canvas', 3600*1000)
            }
        }
    })(i)
}

function addtoTimes(value, type){
    let reg = /^\d+$/
    if(!reg.test(value)){
        alert('只能输入数字')
        return
    }
    switch(type){
        case 1:
            times.hours = value
            break;
        case 2:
            times.minutes = value
            break;
        case 3:
            times.seconds = value
            break;
    }
}

function cancel(){
    input.style.display = 'none'
}

function confCount(){
    let countS = parseInt(times.hours)*3600 + parseInt(times.minutes)*60 + parseInt(times.seconds)
    input.style.display = 'none'
    divs[0].innerHTML = '倒计时'

    container.innerHTML = ''
    let canvas = document.createElement('canvas')
    canvas.id = 'canvas'
    container.appendChild(canvas)

    new Countdown('#canvas', countS * 1000)    
}