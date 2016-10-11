measure-speed
=============
This is a very simple module for measuring the average or median speed of functions.

measureSpeedSync
================
This function takes as arguments a function and an object (options).
It returns the average running time of the function in ms.
```js
var measureSpeedSync = require('measure-speed').measureSpeedSync;

var ms = measureSpeedSync(function () {
  var a = [2, 5, 6, 3, 7, 9, 2, 3, 5, 6, 34, 234, 5, 23, 523, 4, 5, 23, 4, 5, 23, 4, 5, 2, 34];
  a.sort();
}, { samples: 1000 });
```
The options are:
* samples: the number of executions (default 100)
* discard: how many maximum an minimum timings we want to discard (default 1)

measureSpeedSyncAsyncCB
=======================
You can use this to measure the speed of asynchronous functions (callback based).
This function takes as arguments a function, an object (options) and a callback.
It calls the callback with the average running time of the function in ms.
```js
var measureSpeedAsyncCB = require('measure-speed').measureSpeedAsyncCB;

measureSpeedAsyncCB(function () {
  var a = [2, 5, 6, 3, 7, 9, 2, 3, 5, 6, 34, 234, 5, 23, 523, 4, 5, 23, 4, 5, 23, 4, 5, 2, 34];
  a.sort();
},
{ samples: 1000 },
function (err, ms) {
  ...
});
```
The options are:
* samples: the number of executions (default 100)
* discard: how many maximum an minimum timings we want to discard (default 1)
* runParallel: if we want to run the functions in parallel (default false)

measureSpeedAsyncPromise
========================
You can use this to measure the speed of asynchronous functions (promise based).
This function takes as arguments a function, an object (options) and a callback.
It calls the callback with the average running time of the function in ms.
```js
var measureSpeedAsyncPromise = require('measure-speed').measureSpeedAsyncPromise;

measureSpeedAsyncPromise(function () {
  var a = [2, 5, 6, 3, 7, 9, 2, 3, 5, 6, 34, 234, 5, 23, 523, 4, 5, 23, 4, 5, 23, 4, 5, 2, 34];
  a.sort();
},
{ samples: 1000 },
function (err, ms) {
  ...
});
```
The options are:
* samples: the number of executions (default 100)
* discard: how many maximum an minimum timings we want to discard (default 1)
* runParallel: if we want to run the functions in parallel (default false)
