"use strict";

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _View6 = require("../View");

var _View7 = _interopRequireDefault(_View6);

var _Model4 = require("../Model");

var _Model5 = _interopRequireDefault(_Model4);

var _connect = require("../connect");

var _connect2 = _interopRequireDefault(_connect);

var _enzyme = require("enzyme");

var _createStore = require("../createStore");

var _createStore2 = _interopRequireDefault(_createStore);

var _reactRedux = require("react-redux");

var _constants = require("../constants");

var _enzymeAdapterReact = require("enzyme-adapter-react-16");

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setup file
(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

describe("connect", function () {
    var TestModel1 = function (_Model) {
        (0, _inherits3.default)(TestModel1, _Model);

        function TestModel1() {
            (0, _classCallCheck3.default)(this, TestModel1);
            return (0, _possibleConstructorReturn3.default)(this, (TestModel1.__proto__ || (0, _getPrototypeOf2.default)(TestModel1)).apply(this, arguments));
        }

        (0, _createClass3.default)(TestModel1, [{
            key: "add1",
            value: function add1(step) {
                return {
                    count1: this.state.count1 + step
                };
            }
        }]);
        return TestModel1;
    }(_Model5.default);

    TestModel1.initialState = {
        count1: 0
    };

    var TestModel2 = function (_Model2) {
        (0, _inherits3.default)(TestModel2, _Model2);

        function TestModel2() {
            (0, _classCallCheck3.default)(this, TestModel2);
            return (0, _possibleConstructorReturn3.default)(this, (TestModel2.__proto__ || (0, _getPrototypeOf2.default)(TestModel2)).apply(this, arguments));
        }

        (0, _createClass3.default)(TestModel2, [{
            key: "add2",
            value: function add2(step) {
                return {
                    count2: this.state.count2 + step
                };
            }
        }]);
        return TestModel2;
    }(_Model5.default);

    TestModel2.initialState = {
        count2: 0
    };


    test("连接一个Model", function () {
        expect.assertions(4);

        var TestView = function (_View) {
            (0, _inherits3.default)(TestView, _View);

            function TestView() {
                (0, _classCallCheck3.default)(this, TestView);
                return (0, _possibleConstructorReturn3.default)(this, (TestView.__proto__ || (0, _getPrototypeOf2.default)(TestView)).apply(this, arguments));
            }

            (0, _createClass3.default)(TestView, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                    expect(this.actions).toBeDefined();
                    expect(this.actions.add1).toBeDefined();
                    expect(this.props.count1).toEqual(0);
                    expect(this.model.state).toEqual({
                        count1: 0
                    });
                }
            }, {
                key: "render",
                value: function render() {
                    return null;
                }
            }]);
            return TestView;
        }(_View7.default);

        var ConnectView = (0, _connect2.default)(TestView, TestModel1);

        var store = (0, _createStore2.default)();

        var app = (0, _enzyme.mount)(_react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(ConnectView, null)
        ));

        app.unmount();
    });

    test("连接相互merge的多个Model", function () {
        expect.assertions(7);

        var TestView = function (_View2) {
            (0, _inherits3.default)(TestView, _View2);

            function TestView(props, context) {
                (0, _classCallCheck3.default)(this, TestView);

                var _this4 = (0, _possibleConstructorReturn3.default)(this, (TestView.__proto__ || (0, _getPrototypeOf2.default)(TestView)).call(this, props, context));

                expect(_this4.actions).toBeDefined();
                expect(_this4.actions.add1).toBeDefined();
                expect(_this4.actions.add2).toBeDefined();
                expect(_this4.props.count1).toEqual(0);
                expect(_this4.props.count2).toEqual(0);
                expect(_this4.model[0].state).toEqual({
                    count1: 0
                });
                expect(_this4.model[1].state).toEqual({
                    count2: 0
                });
                return _this4;
            }

            (0, _createClass3.default)(TestView, [{
                key: "render",
                value: function render() {
                    return null;
                }
            }]);
            return TestView;
        }(_View7.default);

        var ConnectView = (0, _connect2.default)(TestView, [TestModel1, TestModel2]);

        var store = (0, _createStore2.default)();

        var app = (0, _enzyme.mount)(_react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(ConnectView, null)
        ));

        app.unmount();
    });

    test("连接别名区分的多个Model", function () {
        expect.assertions(7);

        var TestView = function (_View3) {
            (0, _inherits3.default)(TestView, _View3);

            function TestView(props, context) {
                (0, _classCallCheck3.default)(this, TestView);

                var _this5 = (0, _possibleConstructorReturn3.default)(this, (TestView.__proto__ || (0, _getPrototypeOf2.default)(TestView)).call(this, props, context));

                expect(_this5.actions).toBeDefined();
                expect(_this5.actions.model1.add1).toBeDefined();
                expect(_this5.actions.model2.add2).toBeDefined();
                expect(_this5.props.model1.count1).toEqual(0);
                expect(_this5.props.model2.count2).toEqual(0);
                expect(_this5.model.model1.state).toEqual({
                    count1: 0
                });
                expect(_this5.model.model2.state).toEqual({
                    count2: 0
                });
                return _this5;
            }

            (0, _createClass3.default)(TestView, [{
                key: "render",
                value: function render() {
                    return null;
                }
            }]);
            return TestView;
        }(_View7.default);

        var ConnectView = (0, _connect2.default)(TestView, {
            model1: TestModel1,
            model2: TestModel2
        });

        var store = (0, _createStore2.default)();

        var app = (0, _enzyme.mount)(_react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(ConnectView, null)
        ));

        app.unmount();
    });

    test("view卸载时，断开与model的连接", function () {
        var TestModel = function (_Model3) {
            (0, _inherits3.default)(TestModel, _Model3);

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
        }(_Model5.default);

        TestModel.isSingleton = true;
        TestModel.initialState = {
            count: 0
        };

        var TestView1 = function (_View4) {
            (0, _inherits3.default)(TestView1, _View4);

            function TestView1(props, context) {
                (0, _classCallCheck3.default)(this, TestView1);
                return (0, _possibleConstructorReturn3.default)(this, (TestView1.__proto__ || (0, _getPrototypeOf2.default)(TestView1)).call(this, props, context));
            }

            (0, _createClass3.default)(TestView1, [{
                key: "render",
                value: function render() {
                    return null;
                }
            }]);
            return TestView1;
        }(_View7.default);

        var TestView2 = function (_View5) {
            (0, _inherits3.default)(TestView2, _View5);

            function TestView2(props, context) {
                (0, _classCallCheck3.default)(this, TestView2);
                return (0, _possibleConstructorReturn3.default)(this, (TestView2.__proto__ || (0, _getPrototypeOf2.default)(TestView2)).call(this, props, context));
            }

            (0, _createClass3.default)(TestView2, [{
                key: "render",
                value: function render() {
                    return null;
                }
            }]);
            return TestView2;
        }(_View7.default);

        var ConnectView1 = (0, _connect2.default)(TestView1, TestModel);
        var ConnectView2 = (0, _connect2.default)(TestView2, TestModel);

        var store = (0, _createStore2.default)();

        var app = (0, _enzyme.mount)(_react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(ConnectView1, null),
                _react2.default.createElement(ConnectView2, null)
            )
        ));

        var model = new TestModel();
        var storeKey = model[_constants.MODEL_STORE_KEY];

        expect(model.state).toEqual({
            count: 0
        });

        app.unmount();

        expect((0, _typeof3.default)(store.state)).toEqual('undefined');
    });
});