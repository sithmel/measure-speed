var assert = require('chai').assert;
var measureSpeedSync = require('../').measureSpeedSync;

describe('measureSpeedSync', function () {
  it('is a function', function () {
    assert.typeOf(measureSpeedSync, 'function');
  });
  it('returns a number', function () {
    var ms = measureSpeedSync(function () {
      var a = [2, 5, 6, 3, 7, 9, 2, 3, 5, 6, 34, 234, 5, 23, 523, 4, 5, 23, 4, 5, 23, 4, 5, 2, 34];
      a.sort();
    }, { samples: 1000 });
    assert.typeOf(ms, 'number');
  });
});
