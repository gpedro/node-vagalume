'use strict';
var test = require('tape');
var Vagalume = require('../../');
var api = new Vagalume();

test('VagalumeAPI :: getArtista(Rage Against the Machine)', function (t) {
  api.getArtista('Rage Against the Machine').then(function (response) {
    t.equal('3ade68b5gef77eda3', response.artist.id);
    t.end();
  }).catch(function (err) {
    t.end();
    throw err;
  });
});
