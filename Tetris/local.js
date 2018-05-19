let Local =function (){
	//游戏对象
	let game;
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
	
	//本地开始游戏
	let start =function(){
		let doms ={
			gameBox:document.getElementById('game'),
			nextBox:document.getElementById('next')
		}
		game = new Game()
		game.init(doms)
		keyEvent()
	}
	
	this.start = start;
}
