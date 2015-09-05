var express = require("express");  
var http = require('http');
var app = express();  

app.get("/", function(request, response) {  
    var now = new Date().toISOString();
    response.json({ time: now });
});                                         

app.listen(3002, function() {                       
    console.log("Time service started on port 3002");
});