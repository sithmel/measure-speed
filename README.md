measure-speed
=============
This is a module for measuring the average or median speed of functions.

measureSpeed
============
This function takes as arguments a function, options object and a callback.
The callback is called with the error (null if everything is ok) and a number of milliseconds.
```js
var measureSpeed = require('measure-speed');

measureSpeed(function () {
  var a = [2, 5, 6, 3, 7, 9, 2, 3, 5, 6, 34, 234, 5, 23, 523, 4, 5, 23, 4, 5, 23, 4, 5, 2, 34];
  a.sort();
},
{ samples: 1000 },
function (err, ms) {
  // ms is the number of milliseconds. The resolution is in microseconds
});
```
The function runs a certain number of times (default 100), every run is timed, the timings are sorted and the biggest and smallest values are removed.
The result is the average of the remainings.
The options are:
* samples: the number of executions (default 100)
* discard: how many maximum and minimum timings we want to discard (default 1)
* setup: this function runs before each test
* tearDown: this function runs after each test

Measure speed works also if the function returns a promise.
```js
measureSpeed(function () {
  return Promise(function (resolve, reject) {
    setTimeout(resolve, 100);
  });
},
{ samples: 1000 },
function (err, ms) {
  // ms is the number of milliseconds. The resolution is in microseconds
});
```
Or a callback
```js
measureSpeed(function (callback) {
  myfunc(callback);
},
{ samples: 1000 },
function (err, ms) {
  // ms is the number of milliseconds. The resolution is in microseconds
});
```

measureSpeedCompare
===================
This allows to run more tests and output the difference in timings:
```js
var measureSpeedCompare = require('measure-speed/compare');

measureSpeedCompare([func1, func2, func3],
{ samples: 1000 }, // same options as measureSpeed
function (err, results) {
  // results.timings is a list of timings
  // results.timingsRel every timing divided by the first one
  // results.timingsPerc every timing divided by the first one (and then multiplied by 100)
});
```
