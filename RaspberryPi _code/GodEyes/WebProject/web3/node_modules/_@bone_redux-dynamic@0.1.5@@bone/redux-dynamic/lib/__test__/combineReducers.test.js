"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _combineReducers = require("../combineReducers");

var _combineReducers2 = _interopRequireDefault(_combineReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("combineReducers", function () {
    test("no change", function () {
        var state = {
            a: 1,
            b: {
                c: 2,
                d: 3
            }
        };

        expect((0, _combineReducers2.default)({
            a: function a(state) {
                return state;
            },
            b: [function (state) {
                return state;
            }, function (state) {
                return state;
            }]
        })(state, {
            type: "action"
        })).toBe(state);
    });

    test("reducer is array: function -> function", function () {
        expect((0, _combineReducers2.default)({
            a: [function (state, action) {
                expect(state).toEqual({
                    b: 'start'
                });

                return (0, _extends3.default)({}, state, {
                    b: state.b + action.split + "reducer1"
                });
            }, function (state, action) {
                expect(state).toEqual({
                    b: 'start -> reducer1'
                });

                return (0, _extends3.default)({}, state, {
                    b: state.b + action.split + "reducer2"
                });
            }]
        })({
            a: {
                b: "start"
            }
        }, {
            type: "pipe",
            split: " -> "
        })).toEqual({
            a: {
                b: "start -> reducer1 -> reducer2"
            }
        });
    });

    test("useCapture", function () {
        var useCaptureReducer = function useCaptureReducer(state, action) {
            return (0, _extends3.default)({}, state, {
                a: state.a + action.split + "function reducer useCapture"
            });
        };
        useCaptureReducer.useCapture = true;

        expect((0, _combineReducers2.default)({
            a: function a(state, action) {
                return state + action.split + "object reducer";
            }
        }, function (state, action) {
            return (0, _extends3.default)({}, state, {
                a: state.a + action.split + "function reducer"
            });
        }, useCaptureReducer)({
            a: "start"
        }, {
            type: "pipe",
            split: " -> "
        })).toEqual({
            a: "start -> function reducer useCapture -> object reducer -> function reducer"
        });
    });

    test("use default state", function () {
        expect((0, _combineReducers2.default)({
            a: function a() {
                var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;

                return state + 1;
            }
        })(undefined, {
            type: "action"
        })).toEqual({
            a: 201
        });
    });
});