"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _getActions = require("../get-actions");

var _getActions2 = _interopRequireDefault(_getActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Base = function () {
    function Base() {
        (0, _classCallCheck3.default)(this, Base);
    }

    (0, _createClass3.default)(Base, [{
        key: "a",
        value: function a() {}
    }, {
        key: "b",
        value: function b() {}
    }]);
    return Base;
}();

var getActions = (0, _getActions2.default)(Base);

describe("get actions", function () {
    test("base", function () {
        var Test = function (_Base) {
            (0, _inherits3.default)(Test, _Base);

            function Test() {
                (0, _classCallCheck3.default)(this, Test);
                return (0, _possibleConstructorReturn3.default)(this, (Test.__proto__ || (0, _getPrototypeOf2.default)(Test)).call(this));
            }

            (0, _createClass3.default)(Test, [{
                key: "b",
                value: function b() {}
            }, {
                key: "c",
                value: function c() {}
            }]);
            return Test;
        }(Base);

        var Test2 = function (_Test) {
            (0, _inherits3.default)(Test2, _Test);

            function Test2() {
                (0, _classCallCheck3.default)(this, Test2);
                return (0, _possibleConstructorReturn3.default)(this, (Test2.__proto__ || (0, _getPrototypeOf2.default)(Test2)).apply(this, arguments));
            }

            (0, _createClass3.default)(Test2, [{
                key: "c",
                value: function c() {}
            }, {
                key: "d",
                value: function d() {}
            }]);
            return Test2;
        }(Test);

        expect(getActions(new Test2())).toEqual(["c", "d", "b"]);
    });
});