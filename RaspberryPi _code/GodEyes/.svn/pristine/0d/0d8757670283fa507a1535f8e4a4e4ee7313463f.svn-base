"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _warning = require("warning");

var _warning2 = _interopRequireDefault(_warning);

var _PathUtils = require("history/es/PathUtils");

var _LocationUtils = require("history/es/LocationUtils");

var _createTransitionManager = require("history/es/createTransitionManager");

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ================ end ===============================================

var clamp = function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
};

/**
 * Creates a history object that stores locations in memory.
 */

/**
 * 本文件直接拷贝自history.js的createMemoryHistory.js
 * 只对以下begin -> end部分做了一点引用修改
 * 对createPath方法做了修改
 */
// =============== begin ==============================================
var createMemoryHistory = function createMemoryHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getUserConfirmation = props.getUserConfirmation,
      _props$initialEntries = props.initialEntries,
      initialEntries = _props$initialEntries === undefined ? ["/"] : _props$initialEntries,
      _props$initialIndex = props.initialIndex,
      initialIndex = _props$initialIndex === undefined ? 0 : _props$initialIndex,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;
  /**
   * 增加mode、basename、hashType参数
   * 使memory生成的地址与browser、hash保持一致
   * 主要用于ssr场景
   */
  // =============== begin ==============================================

  var basename = props.basename ? (0, _PathUtils.stripTrailingSlash)((0, _PathUtils.addLeadingSlash)(props.basename)) : "";

  var HashPathCoders = {
    hashbang: {
      encodePath: function encodePath(path) {
        return path.charAt(0) === "!" ? path : "!/" + (0, _PathUtils.stripLeadingSlash)(path);
      },
      decodePath: function decodePath(path) {
        return path.charAt(0) === "!" ? path.substr(1) : path;
      }
    },
    noslash: {
      encodePath: _PathUtils.stripLeadingSlash,
      decodePath: _PathUtils.addLeadingSlash
    },
    slash: {
      encodePath: _PathUtils.addLeadingSlash,
      decodePath: _PathUtils.addLeadingSlash
    }
  };

  var encodePath = HashPathCoders[props.hashType || "slash"].encodePath;


  var createPath;
  switch (props.mode) {
    case "browser":
      createPath = function createPath(location) {
        return basename + (0, _PathUtils.createPath)(location);
      };
      break;
    case "hash":
      createPath = function createPath(location) {
        return "#" + encodePath(basename + (0, _PathUtils.createPath)(location));
      };
      break;
    default:
      createPath = _PathUtils.createPath;
  }
  // ================ end ===============================================

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    (0, _assign2.default)(history, nextState);

    history.length = history.entries.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === "string" ? (0, _LocationUtils.createLocation)(entry, undefined, createKey()) : (0, _LocationUtils.createLocation)(entry, undefined, entry.key || createKey());
  });

  // Public interface

  var createHref = createPath;

  var push = function push(path, state) {
    (0, _warning2.default)(!((typeof path === "undefined" ? "undefined" : (0, _typeof3.default)(path)) === "object" && path.state !== undefined && state !== undefined), "You should avoid providing a 2nd state argument to push when the 1st " + "argument is a location-like object that already has state; it is ignored");

    var action = "PUSH";
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;

      var nextEntries = history.entries.slice(0);
      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(!((typeof path === "undefined" ? "undefined" : (0, _typeof3.default)(path)) === "object" && path.state !== undefined && state !== undefined), "You should avoid providing a 2nd state argument to replace when the 1st " + "argument is a location-like object that already has state; it is ignored");

    var action = "REPLACE";
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      history.entries[history.index] = location;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);

    var action = "POP";
    var location = history.entries[nextIndex];

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var canGo = function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  };

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return transitionManager.setPrompt(prompt);
  };

  var listen = function listen(listener) {
    return transitionManager.appendListener(listener);
  };

  var history = {
    length: entries.length,
    action: "POP",
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createMemoryHistory;