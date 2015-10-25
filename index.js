'use strict';
/* jshint -W100 */

//Module dependencies
var dashify = require('dashify'),
    qs = require('querystring'),
    BlueBird = require('bluebird'),
    http = require('http'),
    constants = require('./util/constants');

function Vagalume() {

  // I'm Java Developer
  var PRIVATE = {};
  var PUBLIC = this;

  // Private Methods
  PRIVATE.fetch = function(url) {
    return new BlueBird(function(resolve, reject) {
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
          if (isNaN(parseInt(value)) || parseInt(value) < 0) {
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
    return this.prepareRequest(constants.baseApi + method, args);
  };

  PRIVATE.wwwRequest = function(method, args) {
    return this.prepareRequest(constants.baseUrl + method, args);
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

  PUBLIC.getRank = function(type, period, periodVal, scope, limit) {

    var opts = {};

    PRIVATE.requiredParam('type', type, 'string');
    PRIVATE.requiredParam('period', period, 'string');
    PRIVATE.optionalParam('periodVal', periodVal, 'int');
    scope = scope || 'all';
    PRIVATE.optionalParam('limit', limit, 'int');

    opts.type = type;

    if(type !== constants.rank.type.album) {
      opts.period = period;
      if (periodVal) {
        opts.periodVal = periodVal;
      }
    }

    opts.scope = scope;
    opts.limit = limit;

    return PRIVATE.apiRequest('/rank.php?', opts);

  };

  PUBLIC.getImagens = function (bandId, limit) {
    PRIVATE.requiredParam('bandID', bandId, 'string');
    PRIVATE.optionalParam('limit', limit, 'int');

    var opts = { bandID: bandId };

    if (limit > 0) {
      opts.limit = limit;
    }

    return PRIVATE.apiRequest('/image.php?', opts);
  };

  return this;
}

module.exports = Vagalume;
