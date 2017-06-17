'use strict';
var test = require('tape');
var Vagalume = require('../../');
var api = new Vagalume();

test('VagalumeAPI :: getDiscografia(Rage Against the Machine)', function (t) {
  api.getDiscografia('Rage Against the Machine').then(function (response) {
    t.equal(6, response.discography.item.length);
    t.end();
  }).catch(function (err) {
    t.end(err);
  });

});
