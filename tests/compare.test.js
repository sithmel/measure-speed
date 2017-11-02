var assert = require('chai').assert;
var measureSpeedCompare = require('../compare');
require('setimmediate');

describe('measureSpeedCompare', function () {
  it('is a function', function () {
    assert.typeOf(measureSpeedCompare, 'function');
  });

  it('measure a sync function', function (done) {
    var func1 = function () {
      var a = [2, 5, 6, 3, 7, 9, 2, 3, 5, 6, 34, 234, 5, 23, 523, 4, 5, 23, 4, 5, 23, 4, 5, 2, 34];
      a.sort();
    };
    var func2 = function () {
      var a = [2, 5, 6, 3, 7, 9, 2, 3, 5, 6, 34, 234, 5, 23, 523, 4, 5, 23, 4, 5, 23, 4, 5, 2, 34];
      a.sort();
    };

    measureSpeedCompare([func1, func2], { samples: 1000 },
    function (err, results) {
      assert.typeOf(results.timings[0], 'number');
      assert.typeOf(results.timings[1], 'number');

      assert.typeOf(results.timingsRel[0], 'number');
      assert.typeOf(results.timingsRel[1], 'number');

      assert.typeOf(results.timingsPerc[0], 'number');
      assert.typeOf(results.timingsPerc[1], 'number');
      done();
    });
  });
});
