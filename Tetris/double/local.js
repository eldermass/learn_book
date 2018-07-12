let Local =function (){
	//游戏对象
	let game;
	//时间间隔
	let INTERVAL = 200;
	let timer =null
	//时间计数器
	let timeCount = 0;
	//时间
	let time = 0;
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
		timeFunc();
		if(!game.down()){
			game.fixed();
			let line = game.checkClear();
			if(line){
				game.addScore(line)
			}
			let gameOver = game.checkGameOver();
			if(gameOver){
				game.gameOver(false);
				stop();
			}else{
				game.performNext(generateType(),generateDir());
			}
		}

	}
	//生成随机干扰行
	function generataBottomLine(lineNum){
		let lines =[];
		for(let i = 0;i<lineNum;i++){
			let line = [];
			for(let j = 0;j<10;j++){
				let t = Math.ceil(Math.random()*2)-1;
				t == 1 && (t = 2)
				line.push(t)
			}
			lines.push(line);
		}
		return lines;
	}
	//时间函数
	function timeFunc(){
		timeCount++;
		if(timeCount==5){
			timeCount = 0;
			time++;
			game.setTime(time);
			if(time % 10 == 0){
				game.addTailLines(generataBottomLine(1));
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
			gameBox:document.getElementById('local_game'),
			nextBox:document.getElementById('local_next'),
			timeDiv:document.getElementById('local_time'),
			scoreDiv:document.getElementById('local_score'),
			resultDiv:document.getElementById('local_gameover'),			
		}
		game = new Game()
		game.init(doms,generateType(),generateDir())
		keyEvent()
		game.performNext(generateType(),generateDir());
		timer = setInterval(move,INTERVAL)
	}
	
	this.start = start;
}
