"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getKey = exports.addKey = exports.hasKey = undefined;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _history = require("history");

var _createKey = require("./createKey");

var _createKey2 = _interopRequireDefault(_createKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyRegex = /^\/\:\:([0-9a-z]{6})\:\:/;

var hasKey = exports.hasKey = function hasKey(path) {
    return keyRegex.test(path);
};
var addKey = exports.addKey = function addKey(path, keyLength) {
    var key = void 0;
    if (typeof keyLength === "number") {
        key = (0, _createKey2.default)(keyLength);
    } else if (typeof keyLength === "string") {
        key = keyLength;
    } else {
        console.error("addKey(path, keyLength) keyLength\u5FC5\u987B\u662F\u6570\u5B57\u6216\u5B57\u7B26\u4E32\uFF0C\u5374\u63A5\u6536\u5230\u53C2\u6570" + (0, _stringify2.default)(keyLength));
    }

    return "/::" + key + "::" + (path || "/").replace(keyRegex, "");
};
var getKey = exports.getKey = function getKey(path) {
    var match = path.match(keyRegex);
    if (match) {
        return match[1];
    }
    return "";
};

exports.default = function (path, state, key) {
    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        args[_key - 3] = arguments[_key];
    }

    if (typeof path === "string") {
        if (keyRegex.test(path)) {
            key = path.match(keyRegex)[0].replace(/^\/\:\:|\:\:$/g, "");
            path = path.replace(keyRegex, "");
        }
    } else if (path && path.key) {
        key = path.key;
        delete path.key;
    }

    return _history.createLocation.apply(undefined, [path, state, key].concat(args));
};