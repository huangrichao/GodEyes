"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 扩展Switch，使其可以识别path为一个数组
 */
var Switch = function (_BaseSwitch) {
    (0, _inherits3.default)(Switch, _BaseSwitch);

    function Switch() {
        (0, _classCallCheck3.default)(this, Switch);
        return (0, _possibleConstructorReturn3.default)(this, (Switch.__proto__ || (0, _getPrototypeOf2.default)(Switch)).apply(this, arguments));
    }

    (0, _createClass3.default)(Switch, [{
        key: "render",
        value: function render() {
            var route = this.context.router.route;
            var children = this.props.children;

            var location = this.props.location || route.location;

            var match = void 0,
                child = void 0;
            _react2.default.Children.forEach(children, function (element) {
                if (match == null && _react2.default.isValidElement(element)) {
                    var _element$props = element.props,
                        pathProp = _element$props.path,
                        exact = _element$props.exact,
                        strict = _element$props.strict,
                        sensitive = _element$props.sensitive,
                        from = _element$props.from;

                    var path = pathProp || from;

                    child = element;
                    match = path ? path instanceof Array ? function (paths) {
                        var match = void 0;
                        paths.some(function (path) {
                            return match = (0, _reactRouter.matchPath)(location.pathname, { path: path, exact: exact, strict: strict, sensitive: sensitive });
                        });
                        return match;
                    }(path) : (0, _reactRouter.matchPath)(location.pathname, { path: path, exact: exact, strict: strict, sensitive: sensitive }) : route.match;
                }
            });

            return match ? _react2.default.cloneElement(child, { location: location, match: match }) : null;
        }
    }]);
    return Switch;
}(_reactRouter.Switch);

exports.default = Switch;