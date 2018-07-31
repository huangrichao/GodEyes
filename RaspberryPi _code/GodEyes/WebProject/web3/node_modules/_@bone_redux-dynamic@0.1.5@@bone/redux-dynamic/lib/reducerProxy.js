"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = function (reducerObj) {
    var reducerObjs = reducerObj ? reducerObj instanceof Array ? [].concat((0, _toConsumableArray3.default)(reducerObj)) : [reducerObj] : [];
    var _reducer = combineReducerObjs(reducerObjs);

    return {
        /**
         * reducer代理方法
         * @param {array} args 
         */
        reducer: function reducer() {
            return _reducer.apply(undefined, arguments);
        },

        /**
         * 添加reducer
         * @param {array} _reducerObjs 
         */
        add: function add() {
            for (var _len = arguments.length, _reducerObjs = Array(_len), _key = 0; _key < _len; _key++) {
                _reducerObjs[_key] = arguments[_key];
            }

            if (_reducerObjs.length === 0) {
                return NOOP;
            }

            reducerObjs = reducerObjs.concat(_reducerObjs);
            _reducer = combineReducerObjs(reducerObjs);
            // 移除reducer
            return function () {
                var hasRemove = false;

                _reducerObjs.forEach(function (reducerObj) {
                    var index = reducerObjs.indexOf(reducerObj);
                    if (index !== -1) {
                        reducerObjs.splice(index, 1);
                        hasRemove = true;
                    }
                });

                if (hasRemove) {
                    _reducer = combineReducerObjs(reducerObjs);
                }
            };
        },

        /**
         * 替换reducer
         * @param {function|object|array} reducerObj 
         */
        replace: function replace(reducerObj) {
            reducerObjs = reducerObj instanceof Array ? [].concat((0, _toConsumableArray3.default)(reducerObj)) : [reducerObj];
            _reducer = combineReducerObjs(reducerObjs);
        }
    };
};

var _combineReducers = require("./combineReducers");

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _mergeReducers = require("./mergeReducers");

var _mergeReducers2 = _interopRequireDefault(_mergeReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NOOP = function NOOP() {};

/**
 * reducer代理
 * @param {function|object|array} reducerObj 
 */


var NULL = {};
var emptyReducer = function emptyReducer(state) {
    return state;
};

/**
 * 合并多个reducer
 * @param {*} reducerObjs 
 */
var combineReducerObjs = function combineReducerObjs(reducerObjs) {
    if (reducerObjs.length === 0) {
        return emptyReducer;
    }

    var combineReducerObj = (0, _mergeReducers2.default)(reducerObjs.filter(function (item) {
        return (typeof item === "undefined" ? "undefined" : (0, _typeof3.default)(item)) === "object";
    }));
    return _combineReducers2.default.apply(undefined, [combineReducerObj].concat((0, _toConsumableArray3.default)(reducerObjs.filter(function (item) {
        return typeof item === "function";
    }))));
};