"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = function (store) {
    for (var _len = arguments.length, middlewares = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        middlewares[_key - 1] = arguments[_key];
    }

    var _dispatch = applyMiddleware(store, middlewares);

    /**
     * 移除middleware
     * @param {array} _middlewares 
     */
    function remove() {
        var hasRemove = false;

        for (var _len2 = arguments.length, _middlewares = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            _middlewares[_key2] = arguments[_key2];
        }

        _middlewares.forEach(function (middleware) {
            var index = findMiddlewareIndex(middleware, middlewares);
            if (index !== -1) {
                middlewares.splice(index, 1);
                hasRemove = true;
            }
        });

        if (hasRemove) {
            _dispatch = applyMiddleware(store, middlewares);
        }
    }

    function removeFactory(middlewares) {
        return function () {
            remove.apply(undefined, (0, _toConsumableArray3.default)(middlewares));
        };
    }

    return {
        /**
         * dispatch代理
         * @param {array} args 
         */
        dispatch: function dispatch() {
            return _dispatch.apply(undefined, arguments);
        },

        /**
         * 从末尾追加一组middlewares
         * @param {array} _middlewares 
         */
        append: function append() {
            for (var _len3 = arguments.length, _middlewares = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                _middlewares[_key3] = arguments[_key3];
            }

            if (_middlewares.length === 0) {
                return NOOP;
            }

            middlewares = middlewares.concat(_middlewares);
            _dispatch = applyMiddleware(store, middlewares);

            return removeFactory(_middlewares);
        },

        /**
         * 在targetMiddleware前面插入一组middlewares
         * targetMiddleware为空时，插入到最前面
         * @param {object|string} targetMiddleware 
         * @param {array} _middlewares 
         */
        insertBefore: function insertBefore(targetMiddleware) {
            var _middlewares2;

            for (var _len4 = arguments.length, _middlewares = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                _middlewares[_key4 - 1] = arguments[_key4];
            }

            if (_middlewares.length === 0) {
                return NOOP;
            }

            var index;
            if (targetMiddleware) {
                index = findMiddlewareIndex(targetMiddleware, middlewares);
                if (index === -1) {
                    return NOOP;
                }
            } else {
                index = 0;
            }

            (_middlewares2 = middlewares).splice.apply(_middlewares2, [index, 0].concat((0, _toConsumableArray3.default)(_middlewares)));
            _dispatch = applyMiddleware(store, middlewares);

            return removeFactory(_middlewares);
        },

        /**
         * 在targetMiddleware后面插入一组middlewares
         * @param {object|string} targetMiddleware 
         * @param {array} _middlewares 
         */
        insertAfter: function insertAfter(targetMiddleware) {
            for (var _len5 = arguments.length, _middlewares = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                _middlewares[_key5 - 1] = arguments[_key5];
            }

            if (_middlewares.length === 0) {
                return NOOP;
            }

            if (targetMiddleware) {
                var _middlewares3;

                var index = findMiddlewareIndex(targetMiddleware, middlewares);

                if (index === -1) {
                    return NOOP;
                }

                (_middlewares3 = middlewares).splice.apply(_middlewares3, [index + 1, 0].concat((0, _toConsumableArray3.default)(_middlewares)));
                _dispatch = applyMiddleware(store, middlewares);

                return removeFactory(_middlewares);
            } else {
                return appendMiddleware.apply(undefined, (0, _toConsumableArray3.default)(_middlewares));
            }
        },

        remove: remove
    };
};

var _redux = require("redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NOOP = function NOOP() {};

/**
 * 将middlewares合并到store.dispatch方法
 * @param {*} store 
 * @param {*} middlewares 
 */


/**
 * middleware代理
 * @param {object} store 
 * @param {array} middlewares 
 */
function applyMiddleware(store, middlewares) {
    var _dispatch2 = function dispatch() {
        throw new Error("Dispatching while constructing your middleware is not allowed. " + "Other middleware would not be applied to this dispatch.");
    };
    var chain = [];

    var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
            return _dispatch2.apply(undefined, arguments);
        }
    };
    chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
    });
    _dispatch2 = _redux.compose.apply(undefined, (0, _toConsumableArray3.default)(chain))(store.dispatch);

    return _dispatch2;
}

/**
 * 获取middleware在middlewares中的位置
 * @param {object|string} middleware 
 * @param {array} middlewares 
 */
function findMiddlewareIndex(middleware, middlewares) {
    if (typeof middleware === "string") {
        return middlewares.findIndex(function (_middleware) {
            return _middleware.$name === middleware;
        });
    } else {
        return middlewares.indexOf(middleware);
    }
}