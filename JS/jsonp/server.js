var http = require('http')
var fs = require('fs')
var url = require('url')
var server = http.createServer()

server.on('request',function(req,res){
    var parsedUrl = url.parse(req.url, true)
    var pathWithQuery = req.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = req.method
    if(path==='/data'){
        var amount = fs.readFileSync('./db','utf8')
        var newAmount = amount -1
        fs.writeFileSync('./db',newAmount)
        res.statusCode=200
        res.setHeader('Content-Type','application/javascript')
        console.log(query.callback);
        res.write(`${query.callback}.call(undefined,'success')`)
        res.end()
    }else if(path==='/'){
        var html = fs.readFileSync('./index.html','utf8')
        res.statusCode=200
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.write(html)
        res.end()
    }
})

server.listen(8080,function(){
    console.log('3000running', 'nodemon')
})