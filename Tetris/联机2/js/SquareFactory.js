//1形状7
const Square1 = function (){
	//调用Square中的属性和方法
	Square.call(this)
	//旋转
	this.rotates =[
		[
			[0,1,0,0],
			[0,1,0,0],
			[0,1,1,0],
			[0,0,0,0]
		],
		[
			[0,0,0,0],
			[0,1,1,1],
			[0,1,0,0],
			[0,0,0,0]
		],
		[
			[0,0,0,0],
			[0,1,1,0],
			[0,0,1,0],
			[0,0,1,0]
		],
		[
			[0,0,0,0],
			[0,0,1,0],
			[1,1,1,0],
			[0,0,0,0]
		],
	]
}
Square1.prototype = Square.prototype;
//2形状T
const Square2 = function (){
	//方块数据
	Square.call(this)
	//旋转
	this.rotates =[
		[
			[1,1,1,0],
			[0,1,0,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,1,0,0],
			[1,1,0,0],
			[0,1,0,0],
			[0,0,0,0]
		],
		[
			[0,1,0,0],
			[1,1,1,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,1,0,0],
			[0,1,1,0],
			[0,1,0,0],
			[0,0,0,0]
		],
	]
}
Square2.prototype = Square.prototype;
//3 倒7
const Square3 = function (){
	//方块数据
	Square.call(this)
	//旋转
	this.rotates =[
		[
			[0,0,1,0],
			[0,0,1,0],
			[0,1,1,0],
			[0,0,0,0]
		],
		[
			[1,0,0,0],
			[1,1,1,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,1,1,0],
			[0,1,0,0],
			[0,1,0,0],
			[0,0,0,0]
		],
		[
			[0,0,0,0],
			[1,1,1,0],
			[0,0,1,0],
			[0,0,0,0]
		],
	]
}
Square3.prototype = Square.prototype;
//4  I
const Square4 = function (){
	//方块数据
	Square.call(this)
	//旋转
	this.rotates =[
		[
			[0,1,0,0],
			[0,1,0,0],
			[0,1,0,0],
			[0,1,0,0]
		],
		[
			[0,0,0,0],
			[1,1,1,1],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,1,0,0],
			[0,1,0,0],
			[0,1,0,0],
			[0,1,0,0]
		],
		[
			[0,0,0,0],
			[1,1,1,1],
			[0,0,0,0],
			[0,0,0,0]
		],
	]
}
Square4.prototype = Square.prototype;
//5  Z
const Square5 = function (){
	//方块数据
	Square.call(this)
	//旋转
	this.rotates =[
		[
			[1,1,0,0],
			[0,1,1,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,0,1,0],
			[0,1,1,0],
			[0,1,0,0],
			[0,0,0,0]
		],
		[
			[1,1,0,0],
			[0,1,1,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,0,1,0],
			[0,1,1,0],
			[0,1,0,0],
			[0,0,0,0]
		],
	]
}
Square5.prototype = Square.prototype;
//6  田
const Square6 = function (){
	//方块数据
	Square.call(this)
	//旋转
	this.rotates =[
		[
			[0,1,1,0],
			[0,1,1,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,1,1,0],
			[0,1,1,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,1,1,0],
			[0,1,1,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,1,1,0],
			[0,1,1,0],
			[0,0,0,0],
			[0,0,0,0]
		],
	]
}
Square6.prototype = Square.prototype;
//7 反Z
const Square7 = function (){
	//方块数据
	Square.call(this)
	//旋转
	this.rotates =[
		[
			[0,1,1,0],
			[1,1,0,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,1,0,0],
			[0,1,1,0],
			[0,0,1,0],
			[0,0,0,0]
		],
		[
			[0,1,1,0],
			[1,1,0,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,1,0,0],
			[0,1,1,0],
			[0,0,1,0],
			[0,0,0,0]
		]
	]
}
Square7.prototype = Square.prototype;

let SquareFactory = function(){
	
}
SquareFactory.prototype.make = function(index,dir){//7个方块的索引 ， 旋转的方向
	let s;
	index = index +1;
	switch(index){
		case 1:
			s = new Square1();
			break;
		case 2:
			s = new Square2();
			break;
		case 3:
			s = new Square3();
			break;
		case 4:
			s = new Square4();
			break;
		case 5:
			s = new Square5();
			break;
		case 6:
			s = new Square6();
			break;
		case 7:
			s = new Square7();
			break;
		default:
			break;
	}
	s.origin.x = 3;
	s.origin.y = 0;
	s.rotate(dir)
	return s;
}
