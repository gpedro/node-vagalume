'use strict';

var fetch = require('node-fetch');
var dashify = require('dashify');
var qs = require('querystring');
var bluebird = require('bluebird');

function Vagalume() {
  // Promise Fallback
  fetch.Promise = fetch.Promise || bluebird;

  // Configs
  this.baseUrl = 'http://www.vagalume.com.br';
  this.baseApi = 'http://api.vagalume.com.br';

  // I'm Java Developer
  var PRIVATE = {};
  var PUBLIC = this;

  // Private Methods
  PRIVATE.safeString = function (value) {
    return dashify(value.toLowerCase());
  };

  PRIVATE.requiredParam = function (name, value, type) {
    if (value !== undefined) {

      switch (type) {
        case 'integer':
          if (parseInt(value).isNaN()) {
            throw new Error('VagalumeAPI :: O campo ' + name + ' deve ser do tipo ' + type + '.');
          }
        break;

      }

    } else {
      throw new Error('VagalumeAPI :: O campo ' + name + ' é obrigatório.');
    }
  };

  PRIVATE.optionalParam = function (name, value, type) {
    if (value !== undefined) {
      this.requiredParam(name, value, type);
    }
  };

  PRIVATE.prepareRequest = function (url, args) {
    if (args !== undefined && Object.keys(args).length > 0) {
      url += qs.stringify(args);
    }

    return fetch(url).then(function (res) {
      return res.json();
    });
  };

  PRIVATE.apiRequest = function (method, args) {
    return this.prepareRequest(PUBLIC.baseApi + method, args);
  };

  PRIVATE.wwwRequest = function(method, args) {
    return this.prepareRequest(PUBLIC.baseUrl + method, args);
  };



  // Public Methods
  PUBLIC.getArtista = function (name) {
    PRIVATE.requiredParam('name', name, 'string');
    return PRIVATE.wwwRequest('/' + PRIVATE.safeString(name) + '/index.js');
  };

  PUBLIC.getByTrecho = function (query, limit) {
    PRIVATE.requiredParam('query', query, 'string');
    PRIVATE.optionalParam('limit', limit, 'int');

    var opts = { q: query };
    if (limit > 0) {
      opts.limit = limit;
    }

    return PRIVATE.apiRequest('/search.excerpt?', opts);
  };

  PUBLIC.getDiscografia = function (name) {
    PRIVATE.requiredParam('name', name, 'string');

    return PRIVATE.wwwRequest('/' + PRIVATE.safeString(name) + '/discografia/index.js');
  };

  PUBLIC.getHotspots = function () {
    return PRIVATE.apiRequest('/hotspots.php');
  };

  PUBLIC.getNoticias = function () {
    return PRIVATE.wwwRequest('/news/index.js');
  };


  return this;
}



module.exports = Vagalume;
