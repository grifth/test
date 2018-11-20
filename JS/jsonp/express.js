var express = require('express');
var fs = require('fs')
var app = express();
 
app.get('/', function (req, res) {
    var query = req.query
    var amount = fs.readFileSync('./db','utf8')
    var newA = amount - 1
    fs.writeFileSync('./db',newA)
    res.write(`${query.callback}.call(undefined,${newA})`)
    res.end()
})
 
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
}
)