"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _middlewareProxy = require("./middlewareProxy");

var _middlewareProxy2 = _interopRequireDefault(_middlewareProxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 添加middlewares，并扩展store，使其可动态添加/移除middleware
 * middleware可指定$name，方便使用
 * 替代redux中内置的applyMiddleware方法
 * @param {array} middlewares 
 */
exports.default = function () {
    for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
        middlewares[_key] = arguments[_key];
    }

    return function (createStore) {
        return function () {
            var store = createStore.apply(undefined, arguments);
            var proxy = _middlewareProxy2.default.apply(undefined, [store].concat(middlewares));

            return (0, _extends3.default)({}, store, {
                dispatch: proxy.dispatch,
                $middleware: {
                    append: proxy.append,
                    insertBefore: proxy.insertBefore,
                    insertAfter: proxy.insertAfter,
                    remove: proxy.remove
                }
            });
        };
    };
};