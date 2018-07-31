"use strict";

var _uniqueId = require("../unique-id");

var _uniqueId2 = _interopRequireDefault(_uniqueId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("unique id", function () {
    test("base", function () {
        expect((0, _uniqueId2.default)()).not.toBe((0, _uniqueId2.default)());
        expect((0, _uniqueId2.default)("abc")).not.toBe((0, _uniqueId2.default)("abc"));
    });
});