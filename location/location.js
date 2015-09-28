var express = require("express");
var rest = require('unirest');
var app = express();  
var colors = require('colors');
var port = (process.argv.length > 2) ? parseInt(process.argv[2],10) : 3400
var MMDBReader = require('mmdb-reader');
var ipify = require('ipify');

app.get("/ping", function(request, response) { 
	console.log("ping received :)".yellow)
	response.send("pong\n".yellow);        
});

var ipToInt = function(ipString){
    var str = ipString.toString()
    str = str.split(".")
    var value = (str[0]*Math.pow(256, 3)+(str[1]*Math.pow(256, 2))+(str[2]*256)+str[3]) 
    return value
}
app.get('/location/:ip?', function(request, response) {
    var ipAddress = ""
    if (request.params.ip != null)
        ipAddress = request.params.ip
    var loc = rest.get("http://ip-api.com/json/" + ipAddress).end(function(){
        var locationData = { 'country': {
            'language': loc.response.body.region + 'lish',
            'name': loc.response.body.country,
            'geoname_id': ipToInt(loc.response.body.query),
            'iso_code': loc.response.body.countryCode
        },
        'host': loc.response.body.query
    };
    response.json(locationData);
    });
});

app.listen(port, function() {                       
	console.log(colors.yellow("Locations service started on port %s"), port);
});


setInterval(function() {
	rest.post("http://localhost:3000/location/"+port).end();
}, 5000);