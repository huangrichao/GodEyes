"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _reducerProxy = require("./reducerProxy");

var _reducerProxy2 = _interopRequireDefault(_reducerProxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 扩展store，使其可动态添加/移除reducer
 * @param {function} createStore 
 */
exports.default = function (createStore) {
    return function (reducerObj, initialState) {
        for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            rest[_key - 2] = arguments[_key];
        }

        if (initialState) {
            initialState = (0, _extends3.default)({}, initialState);
        }

        var proxy = (0, _reducerProxy2.default)(reducerObj);

        var store = createStore.apply(undefined, [proxy.reducer, initialState].concat(rest));

        return (0, _extends3.default)({}, store, {
            replaceReducer: proxy.replace,
            $reducer: {
                add: proxy.add
            }
        });
    };
};