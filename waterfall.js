function waterfall(funcs) {

  return function _waterfall(cb) {
    var functions = funcs.slice(0);
    var currentFunc;
    var results = [];

    function callback(err, res) {
      if (err) {
        return cb(err);
      }
      results.push(res);
      if (functions.length === 0) {
        return cb(null, results);
      }
      currentFunc = functions.shift();
      currentFunc(callback);
    }
    currentFunc = functions.shift();
    currentFunc(callback);
  };
}

module.exports = waterfall;
