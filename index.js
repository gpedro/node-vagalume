'use strict';

var dashify = require('dashify');
var qs = require('querystring');
var Promise = require('bluebird');
var http = require('http');

function Vagalume() {

  // I'm Java Developer
  var PRIVATE = {};
  var PUBLIC = this;

  // Configs
  PRIVATE.baseUrl = 'http://www.vagalume.com.br';
  PRIVATE.baseApi = 'http://api.vagalume.com.br';

  // Private Methods
  PRIVATE.fetch = function(url) {
    return new Promise(function(resolve, reject) {
      http.get(url, function(res) {
        var body = '';
        res.on('data', function(chunk) {
          body += chunk;
        });

        res.setEncoding('utf8');

        res.on('end', function () {
          return resolve(JSON.parse(body));
        });
      }).on('error', function(err) {
        return reject(err);
      });
    });
  };

  PRIVATE.safeString = function (value) {
    return dashify(value.toLowerCase());
  };

  PRIVATE.requiredParam = function (name, value, type) {
    if (value !== undefined) {

      switch (type) {
        case 'int':
          if (isNaN(parseInt(value))) {
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

    return PRIVATE.fetch(url);
  };

  PRIVATE.apiRequest = function (method, args) {
    return this.prepareRequest(this.baseApi + method, args);
  };

  PRIVATE.wwwRequest = function(method, args) {
    return this.prepareRequest(this.baseUrl + method, args);
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
