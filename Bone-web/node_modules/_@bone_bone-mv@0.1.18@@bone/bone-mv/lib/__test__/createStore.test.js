"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _createStore = require("../createStore");

var _createStore2 = _interopRequireDefault(_createStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("createStore", function () {
    test("添加reducer", function () {
        var store = (0, _createStore2.default)(null, {});

        expect((0, _typeof3.default)(store.getState().count)).toBe('undefined');
        store.dispatch({
            type: 'test',
            payload: {
                count: 1
            }
        });
        expect((0, _typeof3.default)(store.getState().count)).toBe('undefined');

        store.$reducer.add(function (state, action) {
            if (action.type === 'test') {
                return (0, _extends3.default)({}, state, action.payload);
            }
        });

        store.dispatch({
            type: 'test',
            payload: {
                count: 1
            }
        });
        expect(store.getState().count).toEqual(1);
    });

    test("移除reducer", function () {
        var store = (0, _createStore2.default)(function (state, action) {
            return (0, _extends3.default)({}, state);
        }, { count: 0 });

        var remove = store.$reducer.add(function (state, action) {
            if (action.type === 'test') {
                return (0, _extends3.default)({}, state, action.payload);
            }
        });

        // reducer works
        store.dispatch({
            type: 'test',
            payload: {
                count: 1
            }
        });
        expect(store.getState().count).toEqual(1);

        // reducer removed
        remove();
        // nothing happened
        store.dispatch({
            type: 'test',
            payload: {
                count: 2
            }
        });
        expect(store.getState().count).toEqual(1);
    });
});