'use strict';
var test = require('tape');
var Vagalume = require('../../');
var api = new Vagalume();

test('VagalumeAPI :: getNoticias()', function (t) {
  api.getNoticias().then(function (response) {
    t.equal(20, response.news.length);
    t.end();
  }).catch(function (err) {
    t.end();
    throw err;
  });

});
