var Vagalume = require('./index.js');
if (typeof global.window.define == 'function' && global.window.define.amd) {
  global.window.define('Vagalume', function () { return Vagalume; });
} else {
  global.window.Vagalume = Vagalume;
}
