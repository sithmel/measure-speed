var MinMaxHeap = require('little-ds-toolkit/lib/min-max-heap');
var waterfall = require('./waterfall');
var wrapStartEnd = require('./wrapStartEnd');
var now = require('performance-now');


function getHeap() {
  return new MinMaxHeap(function (a, b) {
    return a - b;
  });
}

function Stats() {
  this.data = getHeap();
  this.events = {};
}

Stats.prototype.average = function () {
  var sum = this.data.toArray().reduce(function (acc, x) { return acc + x; }, 0);
  return sum / this.data.size();
};

Stats.prototype.discard = function (n) {
  if (n) {
    for (var i = 0; i < n; i++) {
      this.data.popMin();
      this.data.popMax();
    }
  }
};

Stats.prototype.start = function (id) {
  this.events[id] = now();
};

Stats.prototype.end = function (id) {
  if (id in this.events) {
    this.data.push(now() - this.events[id]);
    delete this.events[id];
  }
};

function wrapSyncFunc(func) {
  return function (done) {
    var out;
    try {
      out = func();
    } catch (e) {
      return done(e);
    }

    if (out && 'then' in out) {
      out
        .then(done)
        .catch(done);
    } else {
      done();
    }
  };
}

function wrapAsyncFunc(func) {
  return function (done) {
    func(done);
  };
}

function measureSpeed(func, opts, cb) {
  opts = opts || {};
  var samples = opts.samples || 100;
  var discard = opts.discard || 1;
  func = func.length === 0 ? wrapSyncFunc(func) : wrapAsyncFunc(func);
  var stats = new Stats();

  var functions = [];
  for (var i = 0; i < samples; i++) {
    functions.push((function (index) {
      var decorator = wrapStartEnd(function () {
        stats.start(index);
      },
      function () {
        stats.end(index);
      });
      return decorator(func);
    }(i)));
  }

  var composedFunc = waterfall(functions);

  composedFunc(function (err) {
    if (err) {
      return cb(err);
    }
    stats.discard(discard);
    cb(null, stats.average());
  });
}

// function measureSpeedCompare(funcArray, options, cb) {
//   var composedFunc = waterfall(functions);
//
// }

module.exports = measureSpeed;
