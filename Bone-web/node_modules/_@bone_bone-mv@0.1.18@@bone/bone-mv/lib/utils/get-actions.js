"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getOwnPropertyNames = require("babel-runtime/core-js/object/get-own-property-names");

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 从model中过滤actions名
exports.default = function (ModelBase) {
    return function (model) {
        var actions = [];

        while ((model = (0, _getPrototypeOf2.default)(model)) && model.constructor !== ModelBase) {
            (0, _getOwnPropertyNames2.default)(model).forEach(function (propertyName) {
                if (["constructor"].indexOf(propertyName) === -1 && typeof model[propertyName] === "function" && actions.indexOf(propertyName) === -1) {
                    actions.push(propertyName);
                }
            });
        }

        return actions;
    };
};