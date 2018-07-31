'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (key) {
  key = key || sharedKey;

  !counterHash[key] && (counterHash[key] = 0);

  return counterHash[key]++;
};

var sharedKey = '@@shared';
var counterHash = {};

;

var clear = exports.clear = function clear() {
  counterHash = {};
};