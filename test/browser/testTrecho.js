'use strict';
var test = require('tape');
var Vagalume = require('../../');
var api = new Vagalume();

test('VagalumeAPI :: getByTrecho(q=told ya)', function (t) {
  api.getByTrecho('told ya').then(function (response) {
    t.equal(4, response.response.docs.length);
    t.end();
  }).catch(function (err) {
    t.end();
    throw err;
  });

});

test('VagalumeAPI :: getByTrecho(q=told ya, limit=10)', function (t) {
  api.getByTrecho('told ya', 10).then(function (response) {
    t.equal(10, response.response.docs.length);
    t.end();
  }).catch(function (err) {
    t.end();
    throw err;
  });

});
