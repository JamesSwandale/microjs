"use strict";
var chai = require('chai'),
	assert = chai.assert,
	should = require('should'),
	sinon = require('sinon'),
	request = require('supertest'),
	app = 'localhost:3400';


describe('Endpoints test', function() {
	describe('When the locations microservice is accessed it ', function(done) {
		it('can be directly', function(done) {
			request(app).get('/').expect('Content-Type', /json/);
			done();
		});
		it('or through a location route', function(done) {
			request(app).get('/location').expect('Content-Type', /json/);
			done();
		});
	})

	describe("When checking specific ip addresses", function (done){
		it('the correct information should be returned', function (done) {
			var key = process.env.KEY 
			var expected
			if (key == "DB"){
				console.log("db")
				expected = { 'country': {
						'language': 'en',
						'name': 'United Kingdom',
						'geoname_id': 2635167,
						'iso_code': 'GB'
					},
				   'host': '82.211.87.195'
				};
			}else{
				expected = { 'country': {
						'language': "ENGlish",
						'name': 'United Kingdom',
						'geoname_id': "1373415210195",
						'iso_code': 'GB'
					},
				   'host': '82.211.87.195'
				};
			}
			request(app)
				.get('/location/82.211.87.195')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					assert.deepEqual( res.body, expected);
					done();
				})
		});
	})
});

		/*
		it("private ip address will return error information", function (done) {
	    	var expected = {
	                    host: "192.168.0.2",
	                    error: "The address 192.168.0.2 is not in the database."
	                };

	    	request(app)
	    		.get("192.168.0.2")
	    		.expect("Content-Type", /application\/json/)
	            .expect(200)
	            .end(function(err, res) {
					assert.deepEqual( res.body, expected);
					done();
				})
	    });	
	    */	
