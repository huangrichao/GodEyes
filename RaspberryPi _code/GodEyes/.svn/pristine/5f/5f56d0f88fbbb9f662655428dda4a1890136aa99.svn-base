"use strict";

var _mergeReducers = require("../mergeReducers");

var _mergeReducers2 = _interopRequireDefault(_mergeReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("mergeReducers", function () {
    var fun = function fun() {};
    var obj = {
        key: fun
    };
    // reducers长度为0
    test("reducers.length = 0", function () {
        expect((0, _mergeReducers2.default)([])).toEqual({});
    });
    // reducers只有一项
    test("reducers.length = 1", function () {
        var reducer = {
            a: fun
        };

        expect((0, _mergeReducers2.default)([reducer])).toEqual(reducer);

        expect((0, _mergeReducers2.default)([reducer])).not.toBe(reducer);
    });
    // 
    test("function => undefined", function () {
        expect((0, _mergeReducers2.default)([{}, {
            a: fun
        }])).toEqual({
            a: fun
        });
    });
    //
    test("function => function", function () {
        expect((0, _mergeReducers2.default)([{
            a: fun
        }, {
            a: fun
        }])).toEqual({
            a: [fun, fun]
        });
    });
    //
    test("function => array", function () {
        expect((0, _mergeReducers2.default)([{
            a: fun
        }, {
            a: fun
        }, {
            a: fun
        }])).toEqual({
            a: [fun, fun, fun]
        });
    });

    test("reducer type error", function () {
        expect(function () {
            return (0, _mergeReducers2.default)([{
                a: {}
            }, {
                a: fun
            }]);
        }).toThrow();
    });
});