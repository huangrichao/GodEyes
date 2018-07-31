"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperties = require("babel-runtime/core-js/object/define-properties");

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _history = require("history");

var _createKey = require("./createKey");

var _createKey2 = _interopRequireDefault(_createKey);

var _listen = require("./listen");

var _listen2 = _interopRequireDefault(_listen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkKey = function checkKey(keyLength) {
    if (typeof keyLength === "string") {
        // 如果指定了key，则将key替换为指定的key
        history.replaceState((0, _extends3.default)({}, history.state || {}, {
            key: keyLength
        }), null, location.href);
    } else if (!history.state || !history.state.key) {
        // 如果没有history.state.key，则设置一个新的
        history.replaceState((0, _extends3.default)({}, history.state || {}, {
            key: (0, _createKey2.default)(keyLength)
        }), null, location.href);
    }
};

/**
 * 在history.js的createBrowserHistory外进行一次包装
 * 对于没有state的历史栈，补充state
 */

exports.default = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _props$keyLength = props.keyLength,
        keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;


    checkKey(keyLength);

    var history = (0, _history.createBrowserHistory)(props);

    var listen = (0, _listen2.default)(history, checkKey, function () {
        return window.history.state.key;
    }, keyLength);

    var historyProxy = (0, _extends3.default)({}, history, {
        listen: listen
    });

    (0, _defineProperties2.default)(historyProxy, {
        length: {
            get: function get() {
                return history.length;
            }
        },
        action: {
            get: function get() {
                return history.action;
            }
        },
        location: {
            get: function get() {
                return history.location;
            }
        }
    });

    return historyProxy;
};