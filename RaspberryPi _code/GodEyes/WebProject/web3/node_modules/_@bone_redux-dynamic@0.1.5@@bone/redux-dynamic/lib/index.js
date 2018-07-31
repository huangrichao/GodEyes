"use strict";

var _applyMiddleware = require("./applyMiddleware");

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _reducerDynamic = require("./reducerDynamic");

var _reducerDynamic2 = _interopRequireDefault(_reducerDynamic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    applyMiddleware: _applyMiddleware2.default,
    reducerDynamic: _reducerDynamic2.default
};