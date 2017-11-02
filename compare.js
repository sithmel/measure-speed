var waterfall = require('./waterfall');
var measureSpeed = require('.');

function rel(arr) {
  if (!arr.length) return;
  var first = arr[0];
  return arr.map(function (t) { return t / first; });
}

function measureSpeedCompare(funcArray, options, cb) {
  var functions = funcArray.map(function (f) {
    return function (cb) {
      measureSpeed(f, options, cb);
    };
  });
  var composedFunc = waterfall(functions);
  composedFunc(function (err, timings) {
    var results = {};
    if (err) {
      return cb(err);
    }
    results.timings = timings;
    results.timingsRel = rel(timings);
    results.timingsPerc = results.timingsRel.map(function (t) { return t * 100; });    
    cb(null, results);
  });
}

module.exports = measureSpeedCompare;
