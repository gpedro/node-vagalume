'use strict';
var assert = require('assert');
var Vagalume = require('../');
var api = new Vagalume();

describe('node-vagalume node module', function () {

  this.timeout(6000);

  it('VagalumeAPI :: getArtista(Rage Against the Machine)', function (done) {

    api.getArtista('Rage Against the Machine').then(function (response) {
      var body = response.body;

      assert('3ade68b5gef77eda3', body.artist.id);
      done();
    }).catch(function (err) {
      throw err;
    });

  });

  it('VagalumeAPI :: getByTrecho(q=told ya)', function (done) {

    api.getByTrecho('told ya').then(function (response) {
      var body = response.body;
      assert(5, body.response.docs.length);
      done();
    }).catch(function (err) {
      throw err;
    });

  });

  it('VagalumeAPI :: getByTrecho(q=told ya, limit=10)', function (done) {

    api.getByTrecho('told ya').then(function (response) {
      var body = response.body;

      assert(10, body.response.docs.length);
      done();
    }).catch(function (err) {
      throw err;
    });

  });

  it('VagalumeAPI :: getDiscografia(Rage Against the Machine)', function (done) {

    api.getDiscografia('Rage Against the Machine').then(function (response) {
      var body = response.body;

      assert(10, body.discography.item.length);
      done();
    }).catch(function (err) {
      throw err;
    });

  });

  it('VagalumeAPI :: getHotspots()', function (done) {

    api.getHotspots().then(function (response) {
      var body = response.body;

      assert(10, body.hotspots);
      done();
    }).catch(function (err) {
      throw err;
    });

  });

  it('VagalumeAPI :: getNoticias()', function (done) {

    api.getNoticias().then(function (response) {
      var body = response.body;

      assert(20, body.news.length);
      done();
    }).catch(function (err) {
      throw err;
    });

  });

});
