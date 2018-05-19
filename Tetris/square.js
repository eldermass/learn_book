const Square = function (){
	//方块数据
	this.data =[
		[0,1,0,0],
		[0,1,0,0],
		[0,1,1,0],
		[0,0,0,0]
	]
	//原点
	this.origin = {
		x:3,y:0
	}
}
Square.prototype.canDown = function(isValid){
	let test ={}
	test.x = this.origin.x;
	test.y = this.origin.y+1;
	return isValid(test,this.data)
}
Square.prototype.down = function(){
	this.origin.y++;
}
