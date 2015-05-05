'use strict';
var test = require('tape');
var Vagalume = require('../../');
var api = new Vagalume();

test('VagalumeAPI :: getHotspots()', function (t) {
  api.getHotspots().then(function (response) {
    t.equal(10, response.hotspots.length);
    t.end();
  }).catch(function (err) {
    t.end();
    throw err;
  });

});
