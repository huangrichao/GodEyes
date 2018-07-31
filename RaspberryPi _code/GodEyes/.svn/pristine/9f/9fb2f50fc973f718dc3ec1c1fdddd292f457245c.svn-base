"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Route = function (_BaseRoute) {
    (0, _inherits3.default)(Route, _BaseRoute);

    function Route() {
        (0, _classCallCheck3.default)(this, Route);
        return (0, _possibleConstructorReturn3.default)(this, (Route.__proto__ || (0, _getPrototypeOf2.default)(Route)).apply(this, arguments));
    }

    (0, _createClass3.default)(Route, [{
        key: "getChildContext",
        value: function getChildContext() {
            var context = (0, _get3.default)(Route.prototype.__proto__ || (0, _getPrototypeOf2.default)(Route.prototype), "getChildContext", this).call(this);
            var history = context.router.history;
            var _location = context.router.route.location;

            var location = history._location = {
                pathname: _location.pathname,
                search: _location.search.replace(/^\?/, ""),
                hash: _location.hash.replace(/^#/, ""),
                state: _location.state,
                params: context.router.route.match.params,
                query: function (search) {
                    var query = {};
                    if (search) {
                        search.replace(/^\?/, "").split("&").forEach(function (item) {
                            var _item$split = item.split("="),
                                _item$split2 = (0, _slicedToArray3.default)(_item$split, 2),
                                key = _item$split2[0],
                                value = _item$split2[1];

                            query[key] = value;
                        });
                    }
                    return query;
                }(_location.search),
                key: _location.key
            };

            var navigation = history._navigation = {
                push: function push(path, state) {
                    return history.push(path, state);
                },
                replace: function replace(path, state) {
                    return history.replace(path, state);
                },
                pop: function pop() {
                    return history.goBack();
                },
                popTo: function popTo(path, state) {}
            };

            return (0, _extends3.default)({}, context, {
                location: location,
                history: history,
                navigation: navigation
            });
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            this.createRenderResult(this.props, this.context, this.state);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.isUnmount = true;
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps, nextContext) {
            var match = this.computeMatch(nextProps, nextContext.router);

            this.setState({
                match: match
            });

            this.createRenderResult(nextProps, nextContext, {
                match: match
            });
        }
    }, {
        key: "getRenderProps",
        value: function getRenderProps(props, context, state) {
            var match = state.match,
                isAsync = state.isAsync,
                placeholder = state.placeholder;
            var children = props.children,
                component = props.component,
                viewType = props.viewType,
                _props$initialProps = props.initialProps,
                initialProps = _props$initialProps === undefined ? {} : _props$initialProps;
            var _context$router = context.router,
                history = _context$router.history,
                route = _context$router.route,
                staticContext = _context$router.staticContext;

            var location = props.location || route.location;

            return (0, _extends3.default)({}, initialProps, { match: match, location: location, history: history, staticContext: staticContext, children: children, __viewType: viewType });
        }
    }, {
        key: "createRenderResult",
        value: function createRenderResult(props, context, state) {
            var _this2 = this;

            if (state.match) {
                var renderProps = this.getRenderProps(props, context, state);
                var component = props.component,
                    placeholder = props.placeholder;


                if (_react.Component.isPrototypeOf(component)) {
                    this.setState({
                        renderResult: _react2.default.createElement(component, renderProps)
                    });
                } else {
                    var tryAsyncComponent = component(renderProps);
                    if (tryAsyncComponent instanceof _promise2.default) {
                        this.setState({
                            renderResult: placeholder ? _react2.default.createElement(placeholder, renderProps) : null
                        });

                        tryAsyncComponent.then(function (component) {
                            if (!_this2.isUnmount) {
                                if (typeof component !== "function" && component.default && typeof component.default === "function") {
                                    component = component.default;
                                }

                                _this2.setState({
                                    renderResult: _react2.default.createElement(component, renderProps)
                                });
                            }
                        });
                    } else {
                        this.setState({
                            renderResult: tryAsyncComponent
                        });
                    }
                }
            } else {
                this.setState({
                    renderResult: null
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return this.state.renderResult;
        }
    }]);
    return Route;
}(_reactRouter.Route);

Route.propTypes = (0, _extends3.default)({}, _reactRouter.Route.propTypes, {
    path: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
    placeholder: _propTypes2.default.func,
    initialProps: _propTypes2.default.object,
    viewType: _propTypes2.default.oneOf([_constants.viewType.layout, _constants.viewType.page])
});
Route.childContextTypes = (0, _extends3.default)({}, _reactRouter.Route.childContextTypes, {
    location: _propTypes2.default.object,
    history: _propTypes2.default.object,
    navigation: _propTypes2.default.object
});
exports.default = Route;