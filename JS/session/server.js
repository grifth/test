var http = require('http')
var fs = require('fs')
var url = require('url')
var server = http.createServer()

server.on('request',function(req,res){
    var parsedUrl = url.parse(req.url, true)
    var pathWithQuery = req.url
    var queryString = ''
    if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = req.method
    // console.log(parsedUrl);
    if(path==='/sign_up'&&method==='GET'){
        let string = fs.readFileSync('./sign_up.html','utf8')
        res.statusCode = 200
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.write(string)
        res.end()
    }else if(path==='/sign_up'&&method==='POST'){
        readBody(req).then(function(data){
            let strings = data.split('&')
            let hash = {}
            strings.forEach((string)=>{
                let parts = string.split('=') 
                let key = parts[0]
                let value = parts[1]
                hash[key] =decodeURIComponent (value) 
            })
            let {email, password, password_confirmation} = hash
            if(email.indexOf('@')===-1){
                res.statusCode = 400
                res.setHeader('Content-Type','application/json')
                res.write(`{
                    "errors":{
                        "email":'invalid
                    }
                }`)
            }else if(password !== password_confirmation){
                res.statusCode = 400
                res.write('password not match')
                res.end()
            }else{
                var users = fs.readFileSync('./db/users','utf8')
                try{
                    users = JSON.parse(users)
                }catch(exception){
                    users = []
                }
                let inUse = false
                for(let i = 0;i<users.length;i++){
                    let user = users[i]
                    if(user.email===email){
                        inUse = true
                        break;
                    }
                }
                if(inUse){
                    res.statusCode = 400
                    res.write('emai in use')
                }else{
                    users.push({email:email,password:password})
                    var usersString = JSON.stringify(users)
                    fs.writeFile('./db/users',usersString)
                }
                res.end()
            }
        },function(err){
        })
    }else if(path==='/sign_in'&& method ==='GET'){
        let string = fs.readFileSync('./sign_in.html','utf8')
        res.statusCode = 200
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.write(string)
        res.end()
    }else if(path==='/sign_in'&&method==='POST'){
        readBody(req).then((body)=>{
            let strings = body.split('&') // ['email=1', 'password=2', 'password_confirmation=3']
            let hash = {}
            strings.forEach((string)=>{
              // string == 'email=1'
              let parts = string.split('=') // ['email', '1']
              let key = parts[0]
              let value = parts[1]
              hash[key] = decodeURIComponent(value) // hash['email'] = '1'
            })
            let {email, password} = hash
            var users = fs.readFileSync('./db/users', 'utf8')
            try{
              users = JSON.parse(users) // []
            }catch(exception){
              users = []
            }
            let found
            for(let i=0;i<users.length; i++){
              if(users[i].email === email && users[i].password === password){
                found = true
                break
              }
            }
            if(found){
              res.setHeader('Set-Cookie', `sign_in_email=${email}`)
              res.statusCode = 200
            }else{
              res.statusCode = 401
            }
            res.end()
          })
    }else if(path==='/'){
        let string = fs.readFileSync('./index.html', 'utf8')
        let cookies =  req.headers.cookie.split('; ') // ['email=1@', 'a=1', 'b=2']
        let hash = {}
        for(let i =0;i<cookies.length; i++){
          let parts = cookies[i].split('=')
          let key = parts[0]
          let value = parts[1]
          hash[key] = value 
        }
        console.log(hash);
        let email = hash.sign_in_email
        let users = fs.readFileSync('./db/users', 'utf8')
        
        users = JSON.parse(users)
        let foundUser

        for(let i=0; i< users.length; i++){
          if(users[i].email === email){
            foundUser = users[i]
            break
          }
        }
        if(foundUser){
          string = string.replace('__password__', foundUser.password)
        }else{
          string = string.replace('__password__', '不知道')
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.write(string)
        res.end()
    }
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
server.listen(3000,function(){
    console.log('3000 running');
})