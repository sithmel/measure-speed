var MinMaxHeap = require('little-ds-toolkit/lib/min-max-heap');
var callbackify = require('async-deco/utils/callbackify');
var waterfall = require('async-deco/callback/waterfall');
var parallel = require('async-deco/callback/parallel');
var addLogger = require('async-deco/utils/add-logger');
var logDecorator = require('async-deco/callback/log');

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
  } else {
    this.data = getHeap();
  }
};

Stats.prototype.start = function (id) {
  this.events[id] = Date.now();
};

Stats.prototype.end = function (id) {
  if (id in this.events) {
    this.data.push(Date.now() - this.events[id]);
    delete this.events[id];
  }
};

function measureSpeedSync(func, opts) {
  opts = opts || {};
  var samples = opts.samples || 100;
  var discard = opts.discard || 1;
  var stats = new Stats();
  for (var i = 0; i < samples; i++) {
    stats.start(i);
    func();
    stats.end(i);
  }
  stats.discard(discard);
  return stats.average();
}

function measureSpeedAsyncCB(func, opts, cb) {
  opts = opts || {};
  var samples = opts.samples || 100;
  var discard = opts.discard || 1;
  var runParallel = opts.runParallel || false;

  var stats = new Stats();
  var addLogs = logDecorator();

  var functions = [];
  for (var i = 0; i < samples; i++) {
    functions.push((function (index) {
      var logger = addLogger(function (event, payload, ts) {
        if (event === 'log-start') {
          stats.start(index);
        }
        if (event === 'log-end') {
          stats.end(index);
        }
      });
      return logger(addLogs(func));
    }(i)));
  }

  var composedFunc = runParallel ? parallel(functions) : waterfall(functions);

  composedFunc(null, function (err) {
    if (err) {
      return cb(err);
    }
    stats.discard(discard);
    cb(null, stats.average());
  });
}

function measureSpeedAsyncPromise(func, opts, cb) {
  return measureSpeedAsyncCB(callbackify(func), opts, cb);
}

module.exports = {
  measureSpeedSync: measureSpeedSync,
  measureSpeedAsyncCB: measureSpeedAsyncCB,
  measureSpeedAsyncPromise: measureSpeedAsyncPromise
};
