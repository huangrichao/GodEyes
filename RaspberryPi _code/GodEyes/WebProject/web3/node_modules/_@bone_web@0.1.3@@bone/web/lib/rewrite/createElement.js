"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _webRouter = require("@bone/web-router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $cache = (0, _symbol2.default)("cache");

var createElement = _react2.default.createElement;
/**
 * 修改创建组件实例的方法，使组件可以使用静态属性的方式指定Model
 * @param {object} Component 
 * @param {array} args 
 * @example
 * class MyComponent extends Component {
 *      static Model = xxx;
 *      ...
 * }
 * 将产生的高阶组件缓存在$cache中
 */
var $createElement = _react2.default.createElement = function (Component, props) {
    if (Component.Model) {
        props = props || {};

        if (!Component[$cache]) {
            var _class, _temp;

            Component[$cache] = (_temp = _class = function (_Component) {
                (0, _inherits3.default)(_class, _Component);

                function _class() {
                    (0, _classCallCheck3.default)(this, _class);
                    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
                }

                return _class;
            }(Component), _class.Model = null, _temp);
        }

        props.$view = Component[$cache];
        props.$model = Component.Model;

        // 通过Connect组件的$ref属性，将包裹的View组件的实例传递出去
        if (typeof props.ref === "function") {
            props.$ref = props.ref;
            delete props.ref;
        } else if (typeof props.ref === "string") {
            props.$ref = true;
        }

        Component = _webRouter.Connect;
    }

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    return createElement.call.apply(createElement, [this, Component, props].concat(args));
};

// 还原方法

exports.default = function () {
    _react2.default.createElement = createElement;
    return $createElement;
};