let lists = document.querySelectorAll('.lists');
for(let i = 0; i<lists.length;i++){
    lists[i].onmouseover = function(){
        this.children[1].style.display ='block'
        this.children[1].style.left = this.offsetLeft+'px'
        this.children[1].style.top = this.offsetTop+this.offsetHeight+'px'
    }
    lists[i].onmouseout = function(){
        this.children[1].style.display ='none'
    }
}

    
    function begin(){
        let seconds = 0;
    //获取初始时间
    let now = new Date()
    let sec = now.getSeconds().toString()
    let sec1 = 0
    sec.length==2 && (sec1 = sec.substr(0,1))
    let sec2 = sec.substr(-1,1)

    let min = now.getMinutes().toString();
    let min1 = 0;
    min.length == 2 && (min1 = min.substr(0,1))
    let min2 = min.substr(-1,1)

    let hour = now.getHours().toString();
    let hour1 = 0;
    hour.length == 2 && (hour1 = hour.substr(0,1))
    let hour2 = hour.substr(-1,1)

    //实例化对象 
     //元素名   高   宽   初始时间值  影藏时间    最大进位数 变框颜色
    let hourCube1 = new Cube('#cube_hour1',80,80,hour1,36000000,3,'lightgreen')
    let hourCube2 = new Cube('#cube_hour2',80,80,hour2,3600000,10,'lightgreen')            
    let minCube1 = new Cube('#cube_min1',80,80,min1,600000,6,'skyblue')
    let minCube2 = new Cube('#cube_min2',80,80,min2,60000,10,'skyblue')
    let secCube1 = new Cube('#cube_sec1',80,80,sec1,10000,6)            
    let secCube2 = new Cube('#cube_sec2',80,80,sec2)
    // 改变阴影颜色
    minCube1.changeShadow(`#228DFF`)
    minCube2.changeShadow(`#228DFF`)
    hourCube1.changeShadow(`green`)
    hourCube2.changeShadow(`green`)

    setInterval(function(){
        seconds++;
        let now = new Date()
        let sec = now.getSeconds().toString()
        let sec1 = 0
        sec.length==2 && (sec1 = sec.substr(0,1))
        let sec2 = sec.substr(-1,1)
        let min = now.getMinutes().toString();
        let min1 = 0;
        min.length == 2 && (min1 = min.substr(0,1))
        let min2 = min.substr(-1,1)

        let hour = now.getHours().toString();
        let hour1 = 0;
        hour.length == 2 && (hour1 = hour.substr(0,1))
        let hour2 = hour.substr(-1,1)
        //调用函数
        secCube2.roCube(sec2)
        if(sec2 == 9){
            secCube1.roCube(sec1,20000,6)
        }
        if(sec1 == 5 && sec2 == 9){
            minCube2.roCube(min2,60000)
        }
        if(min2 == 9 && sec1 == 5 && sec2 == 9){
            minCube1.roCube(min1,600000,6)
        }
        if(min1 == 5 && min2 == 9 && sec1 == 5 && sec2 == 9){
            hourCube2.roCube(hour2,3600000)
        }
        if(hour2 == 9 && min1 == 5 && min2 == 9 && sec1 == 5 && sec2 == 9){
            hourCube1.roCube(hour1,36000000,3)
        }
    },1000)
    }
    begin();
