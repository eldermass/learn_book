let Local =function (socket){
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
						socket.emit('left')
					break;
				case 38://up
						game.rotate()
						socket.emit('rotate')
					break;
				case 39://right
						game.right()
						socket.emit('right')
					break;
				case 40://down
						game.down();
						socket.emit('down')
					break;
				case 32://space
						game.fall()
						socket.emit('fall')
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
			socket.emit('fixed')
			let line = game.checkClear();
			if(line){
				game.addScore(line)
				socket.emit('line',line)
			}
			let gameOver = game.checkGameOver();
			if(gameOver){
				game.gameOver(false);
				document.getElementById('remote_gameover').innerHTML = '你赢了';
				socket.emit('lose')
				stop();
			}else{
				let type2 = generateType();
				let dir2 = generateDir();
				game.performNext(type2,dir2);
				socket.emit('next',{type2,dir2});
			}
		}else{
			socket.emit('down')
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
			socket.emit('time',time);
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
		//缓存变量，发送出去
		let type = generateType();
		let dir = generateDir();
		game.init(doms,type,dir)
		socket.emit('init',{type,dir})
		keyEvent()
		let type2 = generateType();
		let dir2 = generateDir();
		game.performNext(type2,dir2);
		socket.emit('next',{type2,dir2});
		timer = setInterval(move,INTERVAL)
	}
	
	socket.on('start',function(){
		document.getElementById('waiting').innerHTML = 'start';
		start();
	})
	socket.on('lose',function(){
		game.gameOver(true)
		stop()
	})
	socket.on('leave',function(){
		document.getElementById('local_gameover').innerHTML='对方掉线';
		document.getElementById('remote_gameover').innerHTML='已经掉线';		
		stop()
	})
}
