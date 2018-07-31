"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.isGeneratorFunction = isGeneratorFunction;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GeneratorFunction = /*#__PURE__*/_regenerator2.default.mark(function _() {
    return _regenerator2.default.wrap(function _$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                case "end":
                    return _context.stop();
            }
        }
    }, _, this);
}).constructor;
// const AsyncFunction = (async function(){}).constructor;

function isGeneratorFunction(func) {
    return func instanceof GeneratorFunction;
}

// 目前babel对AsyncFunction的转换，是一个普通的Function，无法识别
// export function isAsyncFunction(func){
//     return func instanceof AsyncFunction;
// }