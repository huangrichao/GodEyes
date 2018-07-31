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

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _boneMv = require("@bone/bone-mv");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $pageCache = (0, _symbol2.default)("page-cache");
var $layoutCache = (0, _symbol2.default)("layout-cache");

var View = function (_RootView) {
    (0, _inherits3.default)(View, _RootView);

    function View() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, View);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = View.__proto__ || (0, _getPrototypeOf2.default)(View)).call.apply(_ref, [this].concat(args))), _this), _this[$pageCache] = null, _this[$layoutCache] = null, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(View, [{
        key: "location",
        get: function get() {
            return (this.state.context || this.context).location;
        }
    }, {
        key: "navigation",
        get: function get() {
            return (this.state.context || this.context).navigation;
        }
    }, {
        key: "isLayout",
        get: function get() {
            return this.props.__viewType === _constants.viewType.layout && (this === this.parentView || !this.parentView.isLayout);
        }
    }, {
        key: "isPage",
        get: function get() {
            return this.props.__viewType === _constants.viewType.page && (this === this.parentView || !this.parentView.isPage);
        }

        // page实例

    }, {
        key: "page",
        get: function get() {
            if (!this[$pageCache]) {
                var page = this;
                while (page && !page.isPage) {
                    if (page !== page.parentView) {
                        page = page.parentView;
                    } else {
                        page = void 0;
                    }
                }

                this[$pageCache] = page;
            }

            return this[$pageCache];
        }

        // layout实例

    }, {
        key: "layout",
        get: function get() {
            if (!this[$layoutCache]) {
                var layout = this;
                while (layout && !layout.isLayout) {
                    if (layout !== layout.parentView) {
                        layout = layout.parentView;
                    } else {
                        layout = void 0;
                    }
                }

                this[$layoutCache] = layout;
            }

            return this[$layoutCache];
        }
    }]);
    return View;
}(_boneMv.View);

View.contextTypes = (0, _extends3.default)({}, _boneMv.View.contextTypes, {
    location: _propTypes2.default.object,
    navigation: _propTypes2.default.object
});
exports.default = View;