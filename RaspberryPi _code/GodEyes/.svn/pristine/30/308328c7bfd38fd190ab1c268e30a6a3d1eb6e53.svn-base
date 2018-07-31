"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 针对历史栈维护一套额外数据
 * key为history.js中的location.key，用来唯一标记栈中的一项
 */
var Stacks = function () {
    function Stacks() {
        (0, _classCallCheck3.default)(this, Stacks);

        // 存储的历史栈
        this.stacks = [];
        // 当前位置
        this.currentKey = "";
    }
    /**
     * 设置栈的初始数据
     * @param {*} data 
     */


    (0, _createClass3.default)(Stacks, [{
        key: "init",
        value: function init(key, data) {
            this.stacks = [{
                keys: [key],
                data: data
            }];
            this.currentKey = key;
            this.init = function () {};
        }
        /**
         * 
         * @param {*} key 
         * @param {*} data 
         */

    }, {
        key: "push",
        value: function push(key, data) {
            var _this = this;

            if (!data) {
                this.go(key);
                return;
            }

            var currentIndex = this.stacks.findIndex(function (stack) {
                return stack.keys.indexOf(_this.currentKey) !== -1;
            });
            if (currentIndex !== -1) {
                this.stacks.splice(currentIndex + 1);
                var current = this.stacks[currentIndex];
                current.keys.splice(current.keys.indexOf(this.currentKey) + 1);
                if (data === current.data) {
                    current.keys.push(key);
                } else {
                    this.stacks.push({
                        keys: [key],
                        data: data
                    });
                }
            } else {
                this.stacks = [{
                    keys: [key],
                    data: data
                }];
            }

            this.currentKey = key;
        }
        /**
         * 
         * @param {*} key 
         * @param {*} data 
         */

    }, {
        key: "replace",
        value: function replace(key, data) {
            var _this2 = this;

            if (!data) {
                this.go(key);
                return;
            }

            var currentIndex = this.stacks.findIndex(function (stack) {
                return stack.keys.indexOf(_this2.currentKey) !== -1;
            });
            if (currentIndex !== -1) {
                var current = this.stacks[currentIndex];
                if (current.keys.length === 1) {
                    this.stacks[currentIndex] = {
                        keys: [key],
                        data: data
                    };
                } else if (data === current.data) {
                    current.keys[current.keys.indexOf(this.currentKey)] = key;
                } else {
                    var newStacks = [];
                    var index = current.keys.indexOf(this.currentKey);
                    if (index !== 0) {
                        newStacks.push({
                            keys: current.keys.slice(0, index),
                            data: current.data
                        });
                    }
                    newStacks.push({
                        keys: [key],
                        data: data
                    });
                    if (index !== current.keys.length - 1) {
                        newStacks.push({
                            keys: current.keys.slice(index + 1),
                            data: current.data
                        });
                    }
                    this.stacks.splice(currentIndex, 1, []);
                }
            } else {
                this.stacks = [{
                    keys: [key],
                    data: data
                }];
            }

            this.currentKey = key;
        }
        /**
         * 
         * @param {*} key 
         */

    }, {
        key: "go",
        value: function go(key) {
            this.currentKey = key;
            if (!key) {
                console.error("stacks key\u4E0D\u80FD\u4E3A\u7A7A");
            }
        }
        /**
         * 
         */

    }, {
        key: "current",
        get: function get() {
            var _this3 = this;

            var currentIndex = this.stacks.findIndex(function (stack) {
                return stack.keys.indexOf(_this3.currentKey) !== -1;
            });
            if (currentIndex !== -1) {
                return this.stacks[currentIndex].data;
            }
        }
    }]);
    return Stacks;
}();

exports.default = Stacks;