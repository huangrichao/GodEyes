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

exports.default = function (View, Model) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
        (0, _inherits3.default)(ViewProxy, _Component);

        function ViewProxy() {
            (0, _classCallCheck3.default)(this, ViewProxy);
            return (0, _possibleConstructorReturn3.default)(this, (ViewProxy.__proto__ || (0, _getPrototypeOf2.default)(ViewProxy)).apply(this, arguments));
        }

        (0, _createClass3.default)(ViewProxy, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                var _this2 = this;

                var model = (0, _modelUtils.instantiation)(Model);

                var _modelConnect = (0, _modelUtils.connect)(this.context.store, model),
                    dispatches = _modelConnect.dispatches,
                    unconnect = _modelConnect.unconnect,
                    mapStateToProps = _modelConnect.mapStateToProps,
                    getState = _modelConnect.getState;

                this[DISPATCHES] = dispatches;
                this[UNCONNECT] = unconnect;
                this[GET_STATE] = getState;

                this.model = model.value;
                this.component = (0, _reactRedux.connect)(mapStateToProps, function () {
                    return {
                        actions: _this2[DISPATCHES]
                    };
                }, function (stateProps, dispatchProps, ownProps) {
                    return (0, _extends3.default)({}, ownProps, dispatchProps, stateProps);
                })(View);
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.model = null;
                this[UNCONNECT]();
            }
        }, {
            key: "getChildContext",
            value: function getChildContext() {
                return {
                    dispatches: this[DISPATCHES],
                    getState: this[GET_STATE],
                    model: this.model
                };
            }
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(this.component, this.props);
            }
        }]);
        return ViewProxy;
    }(_react.Component), _class.contextTypes = {
        store: _propTypes2.default.object
    }, _class.childContextTypes = {
        dispatches: _propTypes2.default.object,
        getState: _propTypes2.default.func,
        model: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.arrayOf(_propTypes2.default.object)])
    }, _temp;
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _modelUtils = require("./modelUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UNCONNECT = (0, _symbol2.default)('unconnect');
var DISPATCHES = (0, _symbol2.default)('dispatches');
var GET_STATE = (0, _symbol2.default)('GET_STATE');

/**
 * 连接View和Model
 * @param {object} View 
 * @param {object|array} Model 
 */