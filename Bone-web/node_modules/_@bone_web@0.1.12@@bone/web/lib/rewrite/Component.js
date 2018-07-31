"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _webRouter = require("@bone/web-router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = _react2.default.Component;
_react2.default.Component = _webRouter.View;

// 还原方法

exports.default = function () {
    _react2.default.Component = Component;
    return _webRouter.View;
};