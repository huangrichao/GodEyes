"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 将多个reducer对象合并成一个
 * @param {array} reducers 
 */
exports.default = function (reducers) {
    return reducers.reduce(function (combineReducer, reducer) {
        (0, _keys2.default)(reducer).forEach(function (key) {
            var reducerForKey = reducer[key];
            var combineReducerForKey = combineReducer[key];

            switch (typeof combineReducerForKey === "undefined" ? "undefined" : (0, _typeof3.default)(combineReducerForKey)) {
                case "undefined":
                    combineReducer[key] = reducerForKey;
                    return;
                case "function":
                    combineReducer[key] = [combineReducerForKey, reducerForKey];
                    return;
                case "object":
                    var isArray = combineReducerForKey instanceof Array;
                    if (isArray) {
                        combineReducer[key].push(reducerForKey);
                        return;
                    }
            }

            throw new Error("reducer\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570, \u4F46\u662F" + key + "\u7684reducer\u662F" + (0, _stringify2.default)(combineReducerForKey));
        });

        return combineReducer;
    }, {});
};