let Remote = function (){
    //游戏对象
    let game ;
    //绑定事件
    let bindEvents = function(){
        document.getElementById('left').onclick = function(){
            game.left();
        }
        document.getElementById('performNext').onclick = function(){
            game.performNext(2,3);
        }
    }

    //开始
    let start = function(type,dir){
        let doms ={
			gameBox:document.getElementById('remote_game'),
			nextBox:document.getElementById('remote_next'),
			timeDiv:document.getElementById('remote_time'),
			scoreDiv:document.getElementById('remote_score'),
			resultDiv:document.getElementById('remote_gameover'),			
		}
		game = new Game()
        game.init(doms,type,dir)
    }
    this.start = start;
    this.bindEvents =bindEvents;
}