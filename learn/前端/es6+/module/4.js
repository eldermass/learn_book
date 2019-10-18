import {a,b} from './5.js';
class Person{
	constructor(name,age){
		this.name='Jack';
		this.age=23;
	}
	showname(){
		return this.name;
	}
}
//function Person(){
//	this.name='Jack';
//	this.showname=function(){
//		return this.name
//	}
//}
const show = function(){
	console.log('i am showing')
}
const sum =(a,b)=>{
	return a+b;
}

export default {Person};
export {
	show,sum,a,b
}