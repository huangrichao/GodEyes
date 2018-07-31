"use strict";

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _redux = require("redux");

var _reducerDynamic = require("../reducerDynamic");

var _reducerDynamic2 = _interopRequireDefault(_reducerDynamic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("reducerDynamic", function () {
    test("initialState", function () {
        var store = (0, _reducerDynamic2.default)(_redux.createStore)(null, {
            global1: 100,
            a: 200
        });

        store.dispatch({
            type: 'empty'
        });

        expect(store.getState()).toEqual({
            global1: 100,
            a: 200
        });

        store.$reducer.add(function (state, action) {
            return (0, _extends3.default)({}, state, {
                global1: state.global1 + 1
            });
        });

        store.dispatch({
            type: 'global'
        });

        expect(store.getState()).toEqual({
            global1: 101,
            a: 200
        });

        store.$reducer.add({
            a: function a() {
                var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
                var action = arguments[1];

                return state + 1;
            }
        });

        store.dispatch({
            type: 'action-for-key'
        });

        expect(store.getState()).toEqual({
            global1: 102,
            a: 201
        });

        store.dispatch({
            type: 'action-for-key'
        });

        expect(store.getState()).toEqual({
            global1: 103,
            a: 202
        });
    });

    test("test", function () {
        var store = (0, _reducerDynamic2.default)(_redux.createStore)(null, {});
        store.$reducer.add({
            a: function a(state, action) {
                expect(typeof state === "undefined" ? "undefined" : (0, _typeof3.default)(state)).toBe('undefined');

                return (0, _extends3.default)({}, state, {
                    count: 0
                });
            }
        });

        store.dispatch({
            type: 'test'
        });

        expect(store.getState()["a"]).toEqual({
            count: 0
        });
    });
});