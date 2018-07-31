"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACTION_FAIL_VALIDATE = exports.ACTION_FAIL_SUFFIX = exports.ACTION_SUCCESS_VALIDATE = exports.ACTION_SUCCESS_SUFFIX = exports.ACTION_START_VALIDATE = exports.ACTION_START_SUFFIX = exports.ACTION_UNCONNECT = exports.ACTION_CONNECT = exports.MODEL_CONNECT_VIEW = exports.MODEL_CONNECTED = exports.MODEL_SINGLETON_INSTANCE = exports.MODEL_STORE_KEY = undefined;

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// model实例在store中对应的key
var MODEL_STORE_KEY = exports.MODEL_STORE_KEY = (0, _symbol2.default)("model-store-key");
// 单例Model实例
var MODEL_SINGLETON_INSTANCE = exports.MODEL_SINGLETON_INSTANCE = (0, _symbol2.default)("model-singleton-instance");
// model实例是否已连接到store
var MODEL_CONNECTED = exports.MODEL_CONNECTED = (0, _symbol2.default)("model-connected");
// Model提供的model实例连接到view实例的方法名
var MODEL_CONNECT_VIEW = exports.MODEL_CONNECT_VIEW = (0, _symbol2.default)("model-connect-view");
//
var ACTION_CONNECT = exports.ACTION_CONNECT = /::connect$/;
//
var ACTION_UNCONNECT = exports.ACTION_UNCONNECT = /::unconnect$/;
// 
var ACTION_START_SUFFIX = exports.ACTION_START_SUFFIX = "::start";
// 
var ACTION_START_VALIDATE = exports.ACTION_START_VALIDATE = /::start$/;
// 
var ACTION_SUCCESS_SUFFIX = exports.ACTION_SUCCESS_SUFFIX = "::success";
// 
var ACTION_SUCCESS_VALIDATE = exports.ACTION_SUCCESS_VALIDATE = /::success$/;
// 
var ACTION_FAIL_SUFFIX = exports.ACTION_FAIL_SUFFIX = "::fail";
// 
var ACTION_FAIL_VALIDATE = exports.ACTION_FAIL_VALIDATE = /::fail$/;