// !function(){
// 	var person = {
// 		name:'frank',
// 		age:19
// 	}
// 	window.addAge = function(){
// 		person.age+=1
// 		return person.age
// 	}

// }.call()

var ac = function(){
	var person = {
		name:'franl',
		age:18
	}
	return function(){
		person.age +=1
		return person.age
	}
}
var grow = ac.call()
grow.call()
// 1.立即执行函数使得person无法被外部访问
// 2.闭包使得匿名函数可以操作person
// 3.window.addAge保存了匿名函数的地址
// 4.任何地方都可以使用 window.addAge 操作person 但是不能直接访问person