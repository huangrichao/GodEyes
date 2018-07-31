"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _Model6 = require("../Model");

var _Model7 = _interopRequireDefault(_Model6);

var _createStore = require("../createStore");

var _createStore2 = _interopRequireDefault(_createStore);

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Model", function () {
    test("测试单例模式", function () {
        var TestModel = function (_Model) {
            (0, _inherits3.default)(TestModel, _Model);

            function TestModel() {
                (0, _classCallCheck3.default)(this, TestModel);
                return (0, _possibleConstructorReturn3.default)(this, (TestModel.__proto__ || (0, _getPrototypeOf2.default)(TestModel)).apply(this, arguments));
            }

            return TestModel;
        }(_Model7.default);

        TestModel.isSingleton = true;


        var instance1 = new TestModel();
        var instance2 = new TestModel();

        expect(instance1).toBe(instance2);
    });

    test("与store建立/断开连接", function () {
        var TestModel = function (_Model2) {
            (0, _inherits3.default)(TestModel, _Model2);

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
            }, {
                key: "onInit",
                value: function onInit() {
                    expect(true).toBe(true);
                    this.abc = 666;
                }
            }, {
                key: "onConnect",
                value: function onConnect() {
                    expect(this.abc).toBe(666);
                }
            }, {
                key: "onUnconnect",
                value: function onUnconnect() {
                    expect(this.abc).toBe(666);
                }
            }]);
            return TestModel;
        }(_Model7.default);

        TestModel.initialState = {
            count: 0
        };


        var model = new TestModel();
        var ctx = model[_Model6.CONTEXT];

        var store = (0, _createStore2.default)(null, {});

        expect.assertions(7);
        // 未连接时，model对应的store字段应该为空
        expect((0, _typeof3.default)(ctx.state)).toBe('undefined');

        model[_Model6.CONNECT](store);

        // 连接后，model对应的store字段应该为model初始值
        expect(ctx.state.count).toBe(0);

        ctx.add(2);
        // 连接后，dispatch更新
        expect(ctx.state.count).toBe(2);

        model[_Model6.UNCONNECT]();

        // 断开连接后，model对应的store字段应该为空
        expect((0, _typeof3.default)(ctx.state)).toBe("undefined");
    });

    test("异步action", (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var TestModel, model, ctx, store;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        TestModel = function (_Model3) {
                            (0, _inherits3.default)(TestModel, _Model3);

                            function TestModel() {
                                (0, _classCallCheck3.default)(this, TestModel);
                                return (0, _possibleConstructorReturn3.default)(this, (TestModel.__proto__ || (0, _getPrototypeOf2.default)(TestModel)).apply(this, arguments));
                            }

                            (0, _createClass3.default)(TestModel, [{
                                key: "add",
                                value: function () {
                                    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(step) {
                                        var _this4 = this;

                                        return _regenerator2.default.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        _context.next = 2;
                                                        return new _promise2.default(function (resolve, reject) {
                                                            return setTimeout(function () {
                                                                return resolve({
                                                                    count: _this4.state.count + step
                                                                });
                                                            }, 1000);
                                                        });

                                                    case 2:
                                                        return _context.abrupt("return", _context.sent);

                                                    case 3:
                                                    case "end":
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, this);
                                    }));

                                    function add(_x) {
                                        return _ref2.apply(this, arguments);
                                    }

                                    return add;
                                }()
                            }]);
                            return TestModel;
                        }(_Model7.default);

                        TestModel.initialState = {
                            count: 0
                        };
                        model = new TestModel();
                        ctx = model[_Model6.CONTEXT];
                        store = (0, _createStore2.default)(null, {});


                        model[_Model6.CONNECT](store);

                        expect(ctx.state.count).toBe(0);
                        _context2.next = 9;
                        return ctx.add(6);

                    case 9:
                        expect(ctx.state.count).toBe(6);

                    case 10:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    })));

    test("非单例Model连接View", (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var TestModel, store, model1, model2, ctx1, ctx2, unconnect1, unconnect2;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        TestModel = function (_Model4) {
                            (0, _inherits3.default)(TestModel, _Model4);

                            function TestModel() {
                                (0, _classCallCheck3.default)(this, TestModel);
                                return (0, _possibleConstructorReturn3.default)(this, (TestModel.__proto__ || (0, _getPrototypeOf2.default)(TestModel)).apply(this, arguments));
                            }

                            return TestModel;
                        }(_Model7.default);

                        TestModel.initialState = {
                            count: 0
                        };
                        store = (0, _createStore2.default)(null, {});
                        model1 = new TestModel();
                        model2 = new TestModel();
                        ctx1 = model1[_Model6.CONTEXT];
                        ctx2 = model2[_Model6.CONTEXT];
                        unconnect1 = model1[_constants.MODEL_CONNECT_VIEW](store);
                        unconnect2 = model2[_constants.MODEL_CONNECT_VIEW](store);


                        expect(model1).not.toBe(model2);
                        expect(model1[_constants.MODEL_STORE_KEY]).not.toBe(model2[_constants.MODEL_STORE_KEY]);
                        expect(model1[_Model6.VIEW_COUNT]).toEqual(1);
                        expect(model2[_Model6.VIEW_COUNT]).toEqual(1);
                        expect((0, _typeof3.default)(ctx1.state)).toBe("object");
                        unconnect1();
                        expect(model1[_Model6.VIEW_COUNT]).toEqual(0);
                        expect((0, _typeof3.default)(ctx1.state)).toBe("undefined");

                    case 17:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    })));

    test("单例Model连接View", (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var TestModel, store, model1, model2, ctx1, ctx2, unconnect1, unconnect2;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        TestModel = function (_Model5) {
                            (0, _inherits3.default)(TestModel, _Model5);

                            function TestModel() {
                                (0, _classCallCheck3.default)(this, TestModel);
                                return (0, _possibleConstructorReturn3.default)(this, (TestModel.__proto__ || (0, _getPrototypeOf2.default)(TestModel)).apply(this, arguments));
                            }

                            return TestModel;
                        }(_Model7.default);

                        TestModel.isSingleton = true;
                        TestModel.initialState = {
                            count: 0
                        };
                        store = (0, _createStore2.default)(null, {});
                        model1 = new TestModel();
                        model2 = new TestModel();
                        ctx1 = model1[_Model6.CONTEXT];
                        ctx2 = model2[_Model6.CONTEXT];
                        unconnect1 = model1[_constants.MODEL_CONNECT_VIEW](store);
                        unconnect2 = model2[_constants.MODEL_CONNECT_VIEW](store);


                        expect(model1).toBe(model2);
                        expect(model1[_Model6.VIEW_COUNT]).toEqual(2);
                        unconnect1();
                        expect(model1[_Model6.VIEW_COUNT]).toEqual(1);
                        expect((0, _typeof3.default)(ctx1.state)).toBe("object");
                        unconnect2();
                        expect(model1[_Model6.VIEW_COUNT]).toEqual(0);
                        expect((0, _typeof3.default)(ctx1.state)).toBe("undefined");

                    case 18:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    })));
});