var express = require("express");
var rest = require('unirest');
var app = express();  

var port = (process.argv.length > 2) ? parseInt(process.argv[2],10) : 3400

app.get("/ping", function(request, response) { 
    console.log("ping received :)")
    response.send("pong\n");        
});

app.get("/", function(request, response) {  
    var loc = rest.get("http://ip-api.com/json").end(function(){
	    response.json({
	        location: loc.response.body.city
	    });
    });
});
                                          

app.listen(port, function() {                       
    console.log("Locations service started on port "+port);
});


setInterval(function() {
    rest.post("http://localhost:3000/location/"+port).end();
}, 5000);