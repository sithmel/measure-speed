function wrap(start, end) {
  return function (f) {
    return function (cb) {
      start();
      f(function () {
        end();
        var args = Array.prototype.slice.call(arguments, 0);
        cb.apply(undefined, args);
      });
    };
  };
}

module.exports = wrap;
