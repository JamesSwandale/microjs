var express = require("express");
var rest = require('unirest');
var app = express();  
var colors = require('colors');
var port = (process.argv.length > 2) ? parseInt(process.argv[2],10) : 3400
var MMDBReader = require('mmdb-reader');

app.get("/ping", function(request, response) { 
	console.log("ping received :)".yellow)
	response.send("pong\n".yellow);        
});

app.get('/location/:ip?', function(request, response) {
	var ipAddress = request.params.ip		

	var loc = MMDBReader.open('../geolite-db/GeoLite2-Country.mmdb', function(err, reader){
		var locResponse = reader.lookup(ipAddress);
		var locationData = { 
			'country': {
				'language': "en",
				'name': locResponse.country.names.en,
				'geoname_id': locResponse.country.geoname_id,
				'iso_code': locResponse.country.iso_code
			},
		'host': ipAddress
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