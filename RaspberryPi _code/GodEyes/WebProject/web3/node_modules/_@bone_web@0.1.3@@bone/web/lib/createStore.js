"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (initialState) {
    var devtools;

    // 支持chrome浏览器下的redux调试工具
    if (process.env.NODE_ENV !== 'production' && typeof __REDUX_DEVTOOLS_EXTENSION__ === "function") {
        devtools = __REDUX_DEVTOOLS_EXTENSION__(typeof __REDUX_DEVTOOLS_EXTENSION__OPTIONS !== "undefined" ? __REDUX_DEVTOOLS_EXTENSION__OPTIONS : void 0);
    }

    return (0, _boneMv.applyMiddleware)()(_boneMv.createStore)(null, initialState, devtools);
};

var _boneMv = require("@bone/bone-mv");