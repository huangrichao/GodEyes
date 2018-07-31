"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (config) {
    if (!config.appName) {
        config.container = document.createElement("div");
        document.body.appendChild(config.container);
    } else if (typeof config.appName === "string") {
        config.container = document.getElementById(config.appName);
    } else {
        config.container = config.appName;
    }
    delete config.appName;

    // 第二个app实例开始，使用memory方式的路由，主要用于插件中
    if (global._boneWebAppLenth) {
        config.historyMode = "memory";
    }
    global._boneWebAppLenth = (global._boneWebAppLenth || 0) + 1;

    var hasNoMatch = false;

    config.routes = config.router.routes.map(function (route) {
        route.layout = route.layout || config.layout;
        route.placeholder = route.placeholder || config.placeholder;

        if (!route.path || route.path === "*") {
            hasNoMatch = true;
        }

        return {
            path: route.path,
            component: route.page,
            layout: route.layout,
            placeholder: route.placeholder,
            initialProps: route.initialProps
        };
    });

    // 设置404页面
    if (!hasNoMatch) {
        config.routes.push({
            path: "*",
            component: config.router.notFound || _NoMatch2.default
        });
    }

    delete config.router;

    var app = new _Application2.default(config);

    if (config.autoStart !== false) {
        app.start();
    }

    return app;
};

var _Application = require("./Application");

var _Application2 = _interopRequireDefault(_Application);

var _NoMatch = require("./NoMatch");

var _NoMatch2 = _interopRequireDefault(_NoMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }