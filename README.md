measure-speed
=============
This is a module for measuring the average or median speed of functions.

measureSpeed
============
This function takes as arguments a function, options object and a callback.
The callback is called with the error (null if everything is ok) and a number of milliseconds.
```js
var measureSpeedSync = require('measure-speed');

measureSpeedSync(function () {
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

Measure speed works also if the function returns a promise.
```js
measureSpeedSync(function () {
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
measureSpeedSync(function (callback) {
  myfunc(callback);
},
{ samples: 1000 },
function (err, ms) {
  // ms is the number of milliseconds. The resolution is in microseconds
});
```
