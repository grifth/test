var result = `
/*     面试官你好 我是XXX
    我将以动画的形式来介绍我自己
    只用文字太单调了
    我就用代码来介绍把
    首先准备一些样式 */
*{
transition:all 1s;
}
html{
background:rgb(222,222,222);
font-size:16px;
}
#code{
  border:1px solid red;
}
/* 我需要一点代码高亮*/
.token.selector{
	color: #690;
}
.token.property{
	color: #905;
}
.token.function{
	color:#DD4A68;
}
/*加点3D效果*/
#code{
	transform:rotate(360deg)''
}
`

var n = 0
var id = setInterval(()=>{
      n+=1
    code.innerHTML = result.substring(0,n)
    code.innerHTML = Prism.highlight(code.innerHTML,Prism.languages.css)
    styleTag.innerHTML = result.substring(0,n)
    if(n>=result.length){
      window.clearInterval(id)
    }
},100)