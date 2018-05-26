class Cube{
    constructor(id,height = 50,width = 50,num=0,sec=2000,max=10,borderColor='pink'){
        //元素名   高   宽   初始时间值  影藏时间    最大进位数   边框颜色
        this.tip=0;
        this.tx=0;
        this.shadow = `0 0 2px #fff,
        0 0 4px #fff,
        0 0 6px #fff,
        0 0 8px #FF1177,
        0 0 10px #FF1177,
        0 0 12px #FF1177,
        0 0 15px #FF1177,
        0 0 17px #FF1177`;
        this.max = max;
        this.sec = sec;
        this.num = num;
        this.borderColor = borderColor;
        this.el = document.querySelector(id)
        
        this.el.style.height = height +'px';
        this.el.style.width = width +'px';
        this.height = height ;
        this.width = width;
    
        this.init()
    }
    init(){
        this.el.style.transformOrigin = 'center';
        this.el.style.transformStyle ='preserve-3d';
        this.el.style.position = 'relative';
        this.el.style.boxSizing = 'border-box';
        this.el.style.transition ='all 0.7s 0.3s'
        
        this.generateCube(0,0,'cube_front')
        this.generateCube(90,0,'cube_top')
        this.generateCube(180,0,'cube_back')
        this.generateCube(270,0,'cube_bottom')
        this.generateCube(0,90,'cube_right')
        this.generateCube(0,-90,'cube_left')

        this.start()
    }
    createChild(){
        let div = document.createElement('div');
        div.style.height = this.height + 'px';
        div.style.width = this.width + 'px';
        div.style.position = 'absolute';
        div.style.textShadow = this.shadow;
        div.style.left = 0
        div.style.top = 0
        div.style.boxShadow =`0 0 8px ${this.borderColor}`;
        return div
    }
    generateCube(rox,roy,dir='none'){
        let el1 = this.createChild();
        el1.className = dir;
        // el1.classList.add(dir)
        el1.style.transform = `rotateX(${rox}deg) rotateY(${roy}deg) translateZ(${this.width/2}px)`
        this.el.appendChild(el1)
    }
    swing(x,y){
        this.el.style.transform =`rotateX(${x}deg) rotateY(${y}deg)`
    }	
    //添加时间
    addTime(el,n=0,color='white',sec=this.sec,max=this.max){
        //元素  时间值 颜色  隐藏时间  最大进制
        let front =this.el.querySelector(el)
        front.innerHTML = (parseInt(n))>(max-1)?((parseInt(n))-max):(parseInt(n))        
    
        if(color=='white'){  
            front.style.color ='#f3f3f3';
            front.style.textShadow =''
        }
        if(color=='black'){
            front.style.color ='white';
            front.style.textShadow = this.shadow;
        }
        setTimeout(function(){
            front.style.color ='white';
            front.style.textShadow =this.shadow
        }.bind(this),sec);
    }
    //初始偏移量
    start(){
        //this.num 是初始时间值
        this.swing(-10,10)
        let num =parseInt(this.num)
        this.addTime('.cube_front',num,'black');
        this.addTime('.cube_top',num+1,'black');
        this.addTime('.cube_back',num+2);
        // this.addTime('.cube_bottom',num+3,);					
    }
    roCube(n,sec=2000,max=10){
        //时间值，隐藏时间， 最大进制
        //旋转
        this.tx -= 90
        this.swing(10+this.tx,10)
        //改变时间
        this.tip++;
        n = parseInt(n)+3
        if(this.tip == 1){
            //元素  时间值 颜色  隐藏时间  最大进制
            this.addTime('.cube_bottom',n,'white',sec,max)
        }
        if(this.tip == 2){
            this.addTime('.cube_front',n,'white',sec,max)
        }
        if(this.tip == 3){
            this.addTime('.cube_top',n,'white',sec,max)
        }
        if(this.tip == 4){
            this.addTime('.cube_back',n,'white',sec,max)
        }
        if(this.tip ==4){
            this.tip=0
        }
    }
    changeShadow(str){
        this.shadow = `0 0 2px #fff,
        0 0 4px #fff,
        0 0 6px #fff,
        0 0 8px ${str},
        0 0 10px ${str},
        0 0 12px ${str},
        0 0 15px ${str},
        0 0 17px ${str}`;
        this.start()
    }
}