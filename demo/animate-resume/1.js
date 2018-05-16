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
/*来介绍下我自己把*/
/*需要一张白纸*/
#code{
  position:fixed;
  left:0;
  width:50%
  height100%;
}
#paper{
  position:fixed;
  right:0;
  width:50%;
  height:100%;
  background:black;
  background:#ddd;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:16px;
}
#paper > .content{
  background:white;
  height:100%;
  width:100%;
}
`
//把code写到#code和style的标签中
function writeCode(code, callback) {
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(code.substring(0, n), Prism.languages.css)
        styleTag.innerHTML = result.substring(0, n)
        domCode.scrollTop = 10000
        if (n >= result.length) {
            window.clearInterval(id)
            callback(fn3)
        }
    }, 0)
}

writeCode(result, fn2)

function fn2(callback) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('div')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    callback(result)
}

function fn3(preresult) {
    var n = 0
    var id = setInterval(() => {
        n += 1
        code.innerHTML = preresult + result.substring(0, n)
        code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css)
        styleTag.innerHTML = preresult + result.substring(0, n)
        if (n >= result.length) {
            window.clearInterval(id)
        }
    }, 50)

}

function writeMarkdown(markdown,fn){
  let domPaper = document.querySelector('#paper .content')
    var n = 0
    var id = setInterval(() => {
        n += 1
        domPaper.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.markdown)
        domPaper.scrollTop =100000
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 0)  
}