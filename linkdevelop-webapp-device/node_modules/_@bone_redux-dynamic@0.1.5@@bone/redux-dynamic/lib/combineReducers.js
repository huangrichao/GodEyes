"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 替代redux中内置的combineReducers方法
 * 支持多个reducer同时操作一个字段
 * @param {object} _reducers 
 * 当针对同一个字段出现多个reducer时，从前往后挨个执行（由于这种情况reducer之间会出现state耦合，慎用!!!）
 * 函数类型的reducer可通过reducer.useCapture来设置优先于同级对象类型的reducer执行
 */
var lastObjReducerKeys = null;

exports.default = function () {
    for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
        reducers[_key] = arguments[_key];
    }

    // 对象类型的reducer
    var reducerObj = void 0;
    // 优先执行的函数类型的reducer
    var beforeReducerFns = [];
    // 后续执行的函数类型的reducer
    var afterReducerFns = [];

    // 对reducers进行分类
    reducers.forEach(function (reducer) {
        switch (typeof reducer === "undefined" ? "undefined" : (0, _typeof3.default)(reducer)) {
            case "function":
                if (reducer.useCapture) {
                    beforeReducerFns.push(reducer);
                } else {
                    afterReducerFns.push(reducer);
                }
                break;
            case "object":
                reducerObj = reducer;
                break;
        }
    });

    var objReducerKeys = reducerObj ? (0, _keys2.default)(reducerObj) : [];
    var reducerChanged = false;
    if (lastObjReducerKeys) {
        // reducer是否有变化
        if (objReducerKeys.length !== lastObjReducerKeys.length || objReducerKeys.some(function (key) {
            return lastObjReducerKeys.indexOf(key) === -1;
        })) {
            reducerChanged = true;
        }
    } else {
        lastObjReducerKeys = objReducerKeys;
    }

    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];

        var currentState = state;

        if (beforeReducerFns.length) {
            currentState = beforeReducerFns.reduce(function (state, reducer) {
                return reducer(state, action);
            }, currentState);
        }

        if (reducerObj) {
            var hasChanged = false;
            // 默认清空state，去除无效数据
            var nextState = {};

            for (var key in reducerObj) {
                var reducer = reducerObj[key];
                var previousStateForKey = currentState[key];

                var nextStateForKey = void 0;
                if (typeof reducer === "function") {
                    nextStateForKey = reducer(previousStateForKey, action);
                } else if (reducer instanceof Array) {
                    nextStateForKey = reducer.reduce(function (state, reducer) {
                        return reducer(state, action);
                    }, previousStateForKey);
                }
                nextState[key] = nextStateForKey;

                hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
            }

            if (hasChanged
            // 可能reducerObj中移除了一个reducer，就不会判断到hasChanged
            || reducerChanged) {
                if (reducerChanged) {
                    reducerChanged = false;
                    // 移除的reducer对应的state也一起移除
                    lastObjReducerKeys.forEach(function (key) {
                        if (!reducerObj[key]) {
                            delete currentState[key];
                        }
                    });
                    lastObjReducerKeys = objReducerKeys;
                }

                currentState = (0, _extends3.default)({}, currentState, nextState);
            }
        }

        if (afterReducerFns.length) {
            currentState = afterReducerFns.reduce(function (state, reducer) {
                return reducer(state, action);
            }, currentState);
        }

        return currentState;
    };
};