var express = require('express')
var bodyParser = require('body-parser')
var cp = require('child_process')
var app = express()

app.engine('html',require('express-art-template'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.get('/saber.jpg', function (req, res) {
    res.setHeader("Content-Type","application/force-download")
    res.sendFile(__dirname +'/public/saber.jpg');
  });

app.listen(3000,function(){
    console.log('running3000', '')    
})