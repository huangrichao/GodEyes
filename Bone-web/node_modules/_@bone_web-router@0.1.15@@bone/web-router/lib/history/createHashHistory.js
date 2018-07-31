"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperties = require("babel-runtime/core-js/object/define-properties");

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _createHashHistory = require("./_createHashHistory");

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _createHashLocation = require("./createHashLocation");

var _createKey = require("./createKey");

var _createKey2 = _interopRequireDefault(_createKey);

var _listen = require("./listen");

var _listen2 = _interopRequireDefault(_listen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHashPath = function getHashPath() {
    // We can't use window.location.hash here because it's not
    // consistent across browsers - Firefox will pre-decode it!
    var href = window.location.href;
    var hashIndex = href.indexOf("#");
    return hashIndex === -1 ? "" : href.substring(hashIndex + 1);
};

var replaceHashPath = function replaceHashPath(path) {
    var hashIndex = window.location.href.indexOf("#");

    window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + "#" + path);
};

var keyLength = 6;

var checkKey = function checkKey(key) {
    var path = getHashPath();
    if (typeof key === "string") {
        replaceHashPath((0, _createHashLocation.addKey)(path, key));
    } else if (!(0, _createHashLocation.hasKey)(path)) {
        replaceHashPath((0, _createHashLocation.addKey)(path, keyLength));
    }
};

exports.default = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    checkKey();

    var history = (0, _createHashHistory2.default)(props);

    var listen = (0, _listen2.default)(history, checkKey, function () {
        return (0, _createHashLocation.getKey)(getHashPath());
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