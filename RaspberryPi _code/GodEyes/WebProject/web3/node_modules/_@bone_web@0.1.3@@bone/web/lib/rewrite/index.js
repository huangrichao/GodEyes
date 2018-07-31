"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Component = require("./Component");

var _Component2 = _interopRequireDefault(_Component);

var _createElement = require("./createElement");

var _createElement2 = _interopRequireDefault(_createElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 还原重写
// 重写了react的Component和createElement
exports.default = function (name) {
    if (!name) {
        return {
            Component: (0, _Component2.default)(),
            createElement: (0, _createElement2.default)()
        };
    }

    switch (name) {
        case "Component":
            return (0, _Component2.default)();
        case "createElement":
            return (0, _createElement2.default)();
    }
};