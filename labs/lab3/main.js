/**
 * Purpose: main entry point into our node.js server

we will setup server paths to the following:
    /
    /users
    /userlist
    /name

*/

let http = require("http")
let fs = require("fs")
let users = require("./data") //namespace

const PORT = 8088

var server = http.createServer((request,response)=>{
    if(request.url=="/"){
        response.write("<h1>Node.js server at the root path </h1>")
        response.write("<p>You can go to the other paths to view there server writes as well.</p>")
        response.end()
    }
    if(request.url=="/name"){
        response.writeHead(200,{"Content-Type":"text/html"})
        response.write("<article> Kalid Ali </article>")
        response.end()
    }
    if(request.url=="/users"){
        //convert JSON Object --> JSON string
        let data = JSON.stringify(users.users.id) // was this deep enough into the variable hiearchy --> need to go use dot operator tog et propeort from namespace--> users.users.id
        response.write(data)
        response.end()
    }
    if(request.url=="/userlist"){
        fs.readFile(__dirname + "/employees.json", "utf-8",(error,data)=>{
            response.write(data)
            response.end()
        } )
    }


})
server.listen(PORT)
console.log("The server started at this port: " + PORT)