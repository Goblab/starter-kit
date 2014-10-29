var request = require('supertest'),
    express = require('express');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';


describe('POST New Comment', function(){
  it('creates new comment and responds with json success message', function(done){
    request(app)
    .post('/api/comments')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({"comment": {"message":"The animal is aggressive only during mating, and males in particular fight boldly."}})
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

describe('GET List of Comments', function(){
  it('responds with a list of comment items in JSON', function(done){
    request(app)
    .get('/api/comments')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

describe('GET Comment by ID', function(){
  it('responds with a single comment item in JSON', function(done){
    request(app)
    .get('/api/comments/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});


describe('PUT Comment by ID', function(){
  it('updates comment item in return JSON', function(done){
    request(app)
    .put('/api/comments/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "comment": { "title": "Hell Is Where There Are No Robots" } })    
    .expect(200, done);
  });
});

describe('DELETE Comment by ID', function(){
  it('should delete comment and return 200 status code', function(done){
    request(app)
    .del('/api/comments/'+ _id) 
    .expect(204, done);
  });
});