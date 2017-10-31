var assert = require('chai').assert;
var measureSpeed = require('../');
require('setimmediate');

describe('measureSpeed', function () {
  it('is a function', function () {
    assert.typeOf(measureSpeed, 'function');
  });
  it('measure a sync function', function (done) {
    measureSpeed(function () {
      var a = [2, 5, 6, 3, 7, 9, 2, 3, 5, 6, 34, 234, 5, 23, 523, 4, 5, 23, 4, 5, 23, 4, 5, 2, 34];
      a.sort();
    }, { samples: 1000 },
    function (err, ms) {
      assert.typeOf(ms, 'number');
      done();
    });
  });

  it('measure an empty sync function', function (done) {
    measureSpeed(function () {
    }, { samples: 1000 },
    function (err, ms) {
      assert(ms < 0.01);
      done();
    });
  });

  it('measure an async func', function (done) {
    measureSpeed(function (cb) {
      var a = [2, 5, 6, 3, 7, 9, 2, 3, 5, 6, 34, 234, 5, 23, 523, 4, 5, 23, 4, 5, 23, 4, 5, 2, 34];
      a.sort();
      setImmediate(cb);
    }, { samples: 1000 },
    function (err, ms) {
      assert.typeOf(ms, 'number');
      done();
    });
  });

  it('measure an empty async func', function (done) {
    measureSpeed(function (cb) {
      setImmediate(cb);
    }, { samples: 1000 },
    function (err, ms) {
      assert.typeOf(ms, 'number');
      assert(ms < 0.05);
      done();
    });
  });

  it('measure an async func (promise)', function (done) {
    measureSpeed(function () {
      var a = [2, 5, 6, 3, 7, 9, 2, 3, 5, 6, 34, 234, 5, 23, 523, 4, 5, 23, 4, 5, 23, 4, 5, 2, 34];
      a.sort();
      return Promise.resolve();
    }, { samples: 1000 },
    function (err, ms) {
      assert.typeOf(ms, 'number');
      done();
    });
  });

  it('measure an empty async func (promise)', function (done) {
    measureSpeed(function () {
      return Promise.resolve();
    }, { samples: 1000 },
    function (err, ms) {
      assert.typeOf(ms, 'number');
      assert(ms < 0.05);
      done();
    });
  });
});
