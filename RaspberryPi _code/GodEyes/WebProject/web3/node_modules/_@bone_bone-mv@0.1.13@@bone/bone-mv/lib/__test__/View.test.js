"use strict";

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

var _View2 = require("../View");

var _View3 = _interopRequireDefault(_View2);

var _Model2 = require("../Model");

var _Model3 = _interopRequireDefault(_Model2);

var _connect = require("../connect");

var _connect2 = _interopRequireDefault(_connect);

var _enzyme = require("enzyme");

var _createStore = require("../createStore");

var _createStore2 = _interopRequireDefault(_createStore);

var _reactRedux = require("react-redux");

var _enzymeAdapterReact = require("enzyme-adapter-react-16");

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setup file
(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

describe("View", function () {
    var TestModel = function (_Model) {
        (0, _inherits3.default)(TestModel, _Model);

        function TestModel() {
            (0, _classCallCheck3.default)(this, TestModel);
            return (0, _possibleConstructorReturn3.default)(this, (TestModel.__proto__ || (0, _getPrototypeOf2.default)(TestModel)).apply(this, arguments));
        }

        (0, _createClass3.default)(TestModel, [{
            key: "add",
            value: function add(step) {
                return {
                    count: this.state.count + step
                };
            }
        }]);
        return TestModel;
    }(_Model3.default);

    TestModel.initialState = {
        count: 0
    };


    var propsList = [];

    var TestView = function (_View) {
        (0, _inherits3.default)(TestView, _View);

        function TestView() {
            (0, _classCallCheck3.default)(this, TestView);
            return (0, _possibleConstructorReturn3.default)(this, (TestView.__proto__ || (0, _getPrototypeOf2.default)(TestView)).apply(this, arguments));
        }

        (0, _createClass3.default)(TestView, [{
            key: "render",
            value: function render() {
                var _this3 = this;

                propsList.push(this.props);

                return _react2.default.createElement(
                    "a",
                    { className: "add", onClick: function onClick() {
                            _this3.actions.add(2);
                        } },
                    "add"
                );
            }
        }]);
        return TestView;
    }(_View3.default);

    var ConnectView = (0, _connect2.default)(TestView, TestModel);

    var App = function (_Component) {
        (0, _inherits3.default)(App, _Component);

        function App() {
            (0, _classCallCheck3.default)(this, App);

            var _this4 = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this));

            _this4.state = {
                childProps: {
                    abc: 100
                }
            };
            return _this4;
        }

        (0, _createClass3.default)(App, [{
            key: "render",
            value: function render() {
                var _this5 = this;

                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(ConnectView, this.state.childProps),
                    _react2.default.createElement(
                        "a",
                        { className: "change", onClick: function onClick() {
                                _this5.setState({
                                    childProps: {
                                        abc: _this5.state.childProps.abc + 100
                                    }
                                });
                            } },
                        "change props"
                    )
                );
            }
        }]);
        return App;
    }(_react.Component);

    var store = (0, _createStore2.default)();

    var app = (0, _enzyme.mount)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(App, null)
    ));

    test("connected props", function () {
        expect(propsList[0].count).toEqual(0);
    });

    test("actions", function () {
        propsList = [];

        app.find(".add").simulate("click");
        expect(propsList[0].count).toEqual(2);

        app.find(".add").simulate("click");
        expect(propsList[1].count).toEqual(4);
    });

    test("componentWillReceiveProps", function () {
        propsList = [];

        app.find(".change").simulate("click");
        expect(propsList[0].count).toEqual(4);
        expect(propsList[0].abc).toEqual(200);

        app.find(".add").simulate("click");
        expect(propsList[1].count).toEqual(6);
        expect(propsList[1].abc).toEqual(200);

        app.find(".change").simulate("click");
        expect(propsList[2].count).toEqual(6);
        expect(propsList[2].abc).toEqual(300);
    });
});