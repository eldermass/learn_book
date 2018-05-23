let Remote = function (socket){
    //游戏对象
    let game ;
    //绑定事件
    let bindEvents = function(){
        socket.on('init',function(data){
            start(data.type,data.dir);
        })
        socket.on('next',function(data){
            game.performNext(data.type2,data.dir2);
        }) 
        socket.on('rotate',function(data){
            game.rotate();
        })
        socket.on('right',function(data){
            game.right();
        })
        socket.on('left',function(data){
            game.left();
        })
        socket.on('down',function(data){
            game.down();
        })
        socket.on('fall',function(data){
            game.fall();
        })
        socket.on('fixed',function(data){
            game.fixed();
        })
        socket.on('line',function(data){
            game.checkClear();
            game.addScore(data);
        })
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
    bindEvents();
}