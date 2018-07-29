var http = require('http')
var fs = require('fs')
var url = require('url')
var md5 = require('md5')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

let sessions = {
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)
  if(path==='/a'){
    //格式必须为 binary 否则会出错
    var content =  fs.readFileSync('./20151025031233_F3He2.jpg',"binary");
  //格式必须为 binary，否则会出错
    let fileMD5 = md5(content)
    response.setHeader('ETag',fileMD5)
    if(request.headers['if-none-match']===fileMD5){
      response.statusCode = 304
    }else{
      response.setHeader("Content-Type",  "image/jpeg");
        response.write(content,"binary");
    }
    response.end();
  }else if(path ==='/vue'){
    let string = fs.readFileSync('./js/vue.js','utf8')
    // response.setHeader('Cache-Control','max-age=30')
    let fileMD5 = md5(string)
    response.setHeader('ETag',fileMD5)
    if(request.headers['if-none-match']===fileMD5){
      response.statusCode = 304
    }else{
      response.setHeader('Content-Type','application/javascript;charset=utf8')
      response.write(string)
    }
    response.end()
  }else if(path === '/'){
    let string = fs.readFileSync('./index.html', 'utf8')
    let mySession = sessions[query.sessionId]
    let email
    // let cookies = ''
    // if(request.headers.cookie){
    //    cookies = request.headers.cookie.split(';')
    // }
    // let hash = {}
    // for(let i =0;i<cookies.length;i++){
    //   let parts = cookies[i].split('=')
    //   let key = parts[0]
    //   let value = parts[1]
    //   hash[key] = value
    // }

    // let mySession = sessions[hash.sessionId]
    if(mySession){
       // email = sessions[hash.sessionId].sign_in_email
       email = mySession.sign_in_email
    }
    let users = fs.readFileSync('./db/user','utf8')
    users = JSON.parse(users)
    let foundUser
    for(let i =0;i<users.length;i++){
      if(users[i].email === email){
        foundUser = users[i]
        break
      }
    }
    if(foundUser){
      string = string.replace('__password__',foundUser.password)
    }else{
      string = string.replace('__password__','Unknow')
    }
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/sign_up' && method === 'GET'){
    let string = fs.readFileSync('./sign_up.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/sign_up' && method === 'POST'){
    readBody(request).then((body)=>{
      let strings =  body.split('&')
      let hash = {}
      strings.forEach((string)=>{
        let parts =  string.split('=')
        let key = parts[0]
        let val = parts[1]
        hash[key] = decodeURIComponent(val)
      })
      let {email,password,password_confirmation} = hash
      if(email.indexOf('@')===-1){
        response.statusCode = 400
        response.setHeader('Content-Type','application/json;charset=utf-8')
        response.write(`{
          "errors":{
            "email":"invalid"
          }
        }`)
      }else if(password !== password_confirmation){
        response.statusCode = 400
        response.write('password not match')
      }else{
        var users = fs.readFileSync('./db/user','utf8')
        try{
          users = JSON.parse(users)
        }catch(exception){
          users = []
        }
        for(let i = 0;i<users.length;i++){
          let user = users[i]
          if(user.email === email){
              inUse = true
              break
          }
        }
        if(inUse){
          response.statusCode = 400
          response.write('email in use')
        }else{
          users.push({email: email, password: password})
          var usersString = JSON.stringify(users)
          fs.writeFileSync('./db/user', usersString)
          response.statusCode = 200
        }
      }
      response.end()
    })
  }else if(path==='/sign_in' && method === 'GET'){
    let string = fs.readFileSync('./sign_in.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path==='/sign_in' && method==='POST'){
      readBody(request).then((body)=>{
        let strings = body.split('&')
        let hash = {}
        strings.forEach((string)=>{
          let parts = string.split('=')
          let key = parts[0]
          let val = parts[1]
          hash[key] = decodeURIComponent(val)
        })
        let {email,password} = hash
        var users = fs.readFileSync('./db/user','utf8')
        try{
          users = JSON.parse(users)
        }catch(exception){
          users = []
        }
        let found
        for(let i =0;i<users.length;i++){
          if(users[i].email===email&&users[i].password===password){
            found = true
            break
          }
        }
        if(found){
          let sessionId = Math.random()*1000
          sessions[sessionId] = {sign_in_email:email}
          // response.setHeader('Set-Cookie',`sessionId=${sessionId};HttpOnly`)
          response.write(`{"sessionId":${sessionId}}`)
          response.statusCode = 200
        }else{
          response.statusCode = 401
        }
        response.end()
      })
  }else if(path==='/main.js'){
    let string = fs.readFileSync('./main.js', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path==='/xxx'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin', 'http://frank.com:8001')
    response.write(`
    {
      "note":{
        "to": "小谷",
        "from": "方方",
        "heading": "打招呼",
        "content": "hi"
      }
    }
    `)
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
      {
        "error": "not found"
      }
    `)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

function readBody(request){
  return new Promise((resolve, reject)=>{
    let body = []
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      resolve(body)
    })
  })
}

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
