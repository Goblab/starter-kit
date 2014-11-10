var request = require('supertest'),
    express = require('express');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';


describe('POST New Rabbit', function(){
  it('creates new rabbit and responds with json success message', function(done){
    request(app)
    .post('/api/rabbits')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({"rabbit": {}})
    .expect(201)
    .end(function(err, res) {
      if (err) {
        throw err;
      }
      _id = res.body._id;
      done();
    });
  });
});

describe('GET List of Rabbits', function(){
  it('responds with a list of rabbit items in JSON', function(done){
    request(app)
    .get('/api/rabbits')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

describe('GET Rabbit by ID', function(){
  it('responds with a single rabbit item in JSON', function(done){
    request(app)
    .get('/api/rabbits/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});


describe('PUT Rabbit by ID', function(){
  it('updates rabbit item in return JSON', function(done){
    request(app)
    .put('/api/rabbits/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "rabbit": { "title": "Hell Is Where There Are No Robots" } })    
    .expect(200, done);
  });
});

describe('DELETE Rabbit by ID', function(){
  it('should delete rabbit and return 200 status code', function(done){
    request(app)
    .del('/api/rabbits/'+ _id) 
    .expect(204, done);
  });
});