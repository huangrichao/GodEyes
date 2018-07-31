"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

exports.default = function (View, Model) {
    if (View.Model) {
        if (!View[$cache]) {
            var _class, _temp;

            View[$cache] = (_temp = _class = function (_View) {
                (0, _inherits3.default)(_class, _View);

                function _class() {
                    (0, _classCallCheck3.default)(this, _class);
                    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
                }

                return _class;
            }(View), _class.Model = null, _temp);
        }

        if (!Model) {
            Model = View.Model;
        }

        View = View[$cache];
    }

    return function (props) {
        // 通过Connect组件的$ref属性，将包裹的View组件的实例传递出去
        if (typeof props.ref === "function") {
            props.$ref = props.ref;
            delete props.ref;
        } else if (typeof props.ref === "string") {
            props.$ref = true;
        }

        return _react2.default.createElement(_webRouter.Connect, (0, _extends3.default)({}, props, { $view: View, $model: Model }));
    };
};