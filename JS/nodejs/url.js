var http = require("http");
var url = require("url");


  function onRequest(request, response) {
    var U = request.url
    console.log(url.parse(U));
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }
 
  http.createServer(onRequest).listen(8888);
