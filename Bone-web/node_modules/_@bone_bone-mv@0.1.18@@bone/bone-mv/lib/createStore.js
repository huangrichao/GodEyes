"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

var _reduxDynamic = require("@bone/redux-dynamic");

/**
 * 可以动态添加/移除reducer的createStore
 * 使用的时候代替redux中的createStore
 */
exports.default = (0, _reduxDynamic.reducerDynamic)(_redux.createStore);