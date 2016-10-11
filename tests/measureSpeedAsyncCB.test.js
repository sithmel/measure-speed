var assert = require('chai').assert;
var measureSpeedAsyncCB = require('../').measureSpeedAsyncCB;

describe('measureSpeedAsyncCB', function () {
  it('is a function', function () {
    assert.typeOf(measureSpeedAsyncCB, 'function');
  });

  it('returns a number', function (done) {
    var ms = measureSpeedAsyncCB(function (err, cb) {
      var a = [2, 5, 6, 3, 7, 9, 2, 3, 5, 6, 34, 234, 5, 23, 523, 4, 5, 23, 4, 5, 23, 4, 5, 2, 34];
      a.sort();
      cb(null);
    }, { samples: 1000 },
    function (err, ms) {
      assert.typeOf(ms, 'number');
      done();
    });
  });

  it('returns a number (parallel)', function (done) {
    var ms = measureSpeedAsyncCB(function (err, cb) {
      var a = [2, 5, 6, 3, 7, 9, 2, 3, 5, 6, 34, 234, 5, 23, 523, 4, 5, 23, 4, 5, 23, 4, 5, 2, 34];
      a.sort();
      cb(null);
    }, { samples: 1000, runParallel: true },
    function (err, ms) {
      assert.typeOf(ms, 'number');
      done();
    });
  });
});
