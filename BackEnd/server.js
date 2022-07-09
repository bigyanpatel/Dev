const express = require('express');

const app = express();

app.get("./sayHello", function(req, res){
    res.end("Hello from the server");
})

app.get("./sayBye", function(req, res){
    res.end("Bye bye from the server");
})

app.listen(3000, function(){
    console.log("server started at port 3000");
})