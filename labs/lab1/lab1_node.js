/**Purpose:
 * we use node to create a server and listen on that server for 
 * any incoming requests. Then return a response. 
 * 
 */
var http = require("http");

http.createServer((request,response) => {
    response.writeHead(200,{
        "Contetn-Type": "text/html"
    })
    response.end("The server is now running successfully and listening");
}).listen(8088)

//p[tional hw ---other port numbers]