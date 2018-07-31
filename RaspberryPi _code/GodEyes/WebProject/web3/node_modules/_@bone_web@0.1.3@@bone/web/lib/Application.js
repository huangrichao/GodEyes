"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require("react-redux");

var _webRouter = require("@bone/web-router");

var _createStore = require("./createStore");

var _createStore2 = _interopRequireDefault(_createStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $history = (0, _symbol2.default)("history");

/**
 * config
 * {
 *      // 要渲染到的DOM容器
 *      container,
 *      // 套在路由组件外层的容器组件
 *      Container,
 *      // 当前应用分配的url根路径
 *      basename,
 *      // history模式[browser | hash]，默认browser
 *      historyMode,
 *      // 是否自动启动
 *      autoStart,
 *      // 路由
 *      routes,
 *      // 扩展
 *      plugins,
 *      // 应用初始状态（一般用于服务端渲染时）
 *      initialState
 * }
 */

var Application = function () {
    function Application(config) {
        (0, _classCallCheck3.default)(this, Application);

        this.container = config.container;
        this[$history] = this.createHistory(config.historyMode || "browser", {
            basename: config.basename
        });
        this.routes = config.routes;
        this.store = (0, _createStore2.default)(config.initialState);
        this.initPlugins(config.plugins, this.store);
        this.Container = config.Container;

        this.renderType = config.initialState ? "hydrate" : "render";
    }

    (0, _createClass3.default)(Application, [{
        key: "createHistory",
        value: function createHistory(mode, config) {
            switch (mode) {
                case "browser":
                    return (0, _webRouter.createBrowserHistory)(config);
                case "hash":
                    return (0, _webRouter.createHashHistory)(config);
                case "memory":
                    return (0, _webRouter.createMemoryHistory)(config);
            }

            throw new Error("history mode " + mode);
        }
    }, {
        key: "initPlugins",
        value: function initPlugins(plugins, store) {
            if (!plugins) {
                return;
            }

            var info = {
                app: this
            };

            plugins.forEach(function (plugin) {
                return plugin(store, info);
            });
        }
    }, {
        key: "start",
        value: function start() {
            var Component = _react2.default.createElement(_webRouter.Router, { routes: this.routes, history: this[$history] });

            // 包装自定义Container
            if (this.Container) {
                Component = _react2.default.createElement(
                    this.Container,
                    null,
                    Component
                );
            }

            Component = _react2.default.createElement(
                _reactRedux.Provider,
                { store: this.store },
                Component
            );

            _reactDom2.default[this.renderType](Component, this.container);
        }
    }, {
        key: "location",
        get: function get() {
            return this[$history]._location;
        }
    }, {
        key: "navigation",
        get: function get() {
            return this[$history]._navigation;
        }
    }]);
    return Application;
}();

exports.default = Application;