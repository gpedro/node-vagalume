/**
 * Created by ramos on 16/10/15.
 */

/**
 * Singleton Object
 * @type {{baseUrl: string, baseApi: string}}
 */
var constants = {

  baseUrl: 'http://www.vagalume.com.br',
  baseApi: 'http://api.vagalume.com.br',

  rank: {
    type: {
      artist: 'art',
      album: 'alb',
      music: 'mus'
    }
  }

};

module.exports = Object.freeze(constants);
