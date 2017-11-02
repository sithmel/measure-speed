var measureSpeedCompare = require('../compare');

function getRandomArray(n) {
  var randomArray = [];
  for (var i = 0; i < n; i++) {
    randomArray.push(Math.random() * 10);
  }
  return randomArray;
}

var testarray;

function setup() {
  testarray = getRandomArray(10000);
}

function regularFunctions() {
  var getFunc = function (n) {
    return function () {
      return n * 2;
    };
  };
  var newarray = testarray.map(getFunc);
}

function arrowFunctions() {
  const getFunc = (n) => () => n * 2;
  const newarray = testarray.map(getFunc);
}

measureSpeedCompare([regularFunctions, arrowFunctions],
{ samples: 1000, setup: setup },
function (err, results) {
  console.log('Arrow functions takes ' + results.timingsPerc[1] + '%');
  console.log('(' + results.timings[1] + ' against ' + results.timings[0] + ')');
});
