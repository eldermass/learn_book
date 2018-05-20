let Local =function (){
	//游戏对象
	let game;
	//时间间隔
	let INTERVAL = 200;
	let timer =null
	//绑定键盘事件
	let keyEvent=function(){
		document.onkeydown=function(e){
			switch(e.keyCode){
				case 37://left
						game.left()
					break;
				case 38://up
						game.rotate()
					break;
				case 39://right
						game.right()
					break;
				case 40://down
						game.down();
					break;
				case 32://space
						game.fall()
					break;
				default:
					break;
			}
		}
	}
	let move =function(){
		if(!game.down()){
			game.fixed();
			game.checkClear();
			let gameOver = game.checkGameOver();
			if(gameOver){
				stop();
			}else{
				game.performNext(generateType(),generateDir());
			}
		}

	}
	//生成方块类型
	function generateType(){
		return Math.ceil(Math.random()*7)-1;
	}
	//旋转次数
	function generateDir(){
		return Math.ceil(Math.random()*4)-1;
	}
	//结束游戏
	function stop(){
		if(timer){
			clearInterval(timer);
			timer =null;
		}
		document.onkeydown=null;
	}
	//本地开始游戏
	let start =function(){
		let doms ={
			gameBox:document.getElementById('game'),
			nextBox:document.getElementById('next')
		}
		game = new Game()
		game.init(doms)
		keyEvent()
		timer = setInterval(move,INTERVAL)
	}
	
	this.start = start;
}
