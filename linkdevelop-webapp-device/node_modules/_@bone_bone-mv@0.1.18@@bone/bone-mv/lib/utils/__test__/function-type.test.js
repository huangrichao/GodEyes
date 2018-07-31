"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _functionType = require("../function-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("function type", function () {
    test("isGeneratorFunction", function () {
        var _marked = /*#__PURE__*/_regenerator2.default.mark(test);

        function test() {
            return _regenerator2.default.wrap(function test$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _marked, this);
        }
        function test2() {}

        expect((0, _functionType.isGeneratorFunction)(test)).toBe(true);
        expect((0, _functionType.isGeneratorFunction)(test2)).toBe(false);
    });
});