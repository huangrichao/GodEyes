"use strict";

var _redux = require("redux");

var _applyMiddleware = require("../applyMiddleware");

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACTION = "action";

describe("applyMiddleware", function () {
    function middlewareFactory(name) {
        var middleware = function middleware(store) {
            return function (next) {
                return function (action) {
                    if (!action.chain) {
                        action.chain = [];
                    }

                    action.chain.push("middleware-" + name);

                    next(action);
                };
            };
        };
        middleware.$name = name;
        return middleware;
    }

    var middlewareA = middlewareFactory("A");
    var middlewareB = middlewareFactory("B");

    var store = (0, _redux.createStore)(function (state, action) {
        switch (action.type) {
            case ACTION:
                return {
                    middlewareChain: action.chain
                };
                break;
        }
        return state;
    }, {
        middlewareChain: []
    }, (0, _applyMiddleware2.default)(middlewareA, middlewareB));

    test("test base", function () {
        var unsubscribe = store.subscribe(function () {
            expect(store.getState().middlewareChain).toEqual(["middleware-A", "middleware-B"]);
            unsubscribe();
        });

        store.dispatch({
            type: ACTION
        });
    });

    var removeFn = void 0;

    test("test insertBefore", function () {
        var middlewareC = middlewareFactory("C");
        removeFn = store.$middleware.insertBefore(middlewareB, middlewareC);

        var unsubscribe = store.subscribe(function () {
            expect(store.getState().middlewareChain).toEqual(["middleware-A", "middleware-C", "middleware-B"]);
            unsubscribe();
        });

        store.dispatch({
            type: ACTION
        });
    });

    test("test insertBefore's remove", function () {
        removeFn();

        var unsubscribe = store.subscribe(function () {
            expect(store.getState().middlewareChain).toEqual(["middleware-A", "middleware-B"]);
            unsubscribe();
        });

        store.dispatch({
            type: ACTION
        });
    });

    test("test insertBefore no target", function () {
        var middlewareC = middlewareFactory("C");
        removeFn = store.$middleware.insertBefore(null, middlewareC);

        var unsubscribe = store.subscribe(function () {
            expect(store.getState().middlewareChain).toEqual(["middleware-C", "middleware-A", "middleware-B"]);
            unsubscribe();
        });

        store.dispatch({
            type: ACTION
        });

        removeFn();
    });

    test("test insertBefore multi", function () {
        var middlewareC = middlewareFactory("C");
        var middlewareD = middlewareFactory("D");
        removeFn = store.$middleware.insertBefore(middlewareB, middlewareC, middlewareD);

        var unsubscribe = store.subscribe(function () {
            expect(store.getState().middlewareChain).toEqual(["middleware-A", "middleware-C", "middleware-D", "middleware-B"]);
            unsubscribe();
        });

        store.dispatch({
            type: ACTION
        });
    });

    test("test insertBefore multi's remove", function () {
        removeFn();

        var unsubscribe = store.subscribe(function () {
            expect(store.getState().middlewareChain).toEqual(["middleware-A", "middleware-B"]);
            unsubscribe();
        });

        store.dispatch({
            type: ACTION
        });
    });

    test("test insertBefore multi no target", function () {
        var middlewareC = middlewareFactory("C");
        var middlewareD = middlewareFactory("D");
        removeFn = store.$middleware.insertBefore(null, middlewareC, middlewareD);

        var unsubscribe = store.subscribe(function () {
            expect(store.getState().middlewareChain).toEqual(["middleware-C", "middleware-D", "middleware-A", "middleware-B"]);
            unsubscribe();
        });

        store.dispatch({
            type: ACTION
        });

        removeFn();
    });

    test("test insertAfter", function () {
        var middlewareC = middlewareFactory("C");
        removeFn = store.$middleware.insertAfter(middlewareA, middlewareC);

        var unsubscribe = store.subscribe(function () {
            expect(store.getState().middlewareChain).toEqual(["middleware-A", "middleware-C", "middleware-B"]);
            unsubscribe();
        });

        store.dispatch({
            type: ACTION
        });

        removeFn();
    });

    test("test use middleware $name", function () {
        var middlewareC = middlewareFactory("C");
        removeFn = store.$middleware.insertAfter("A", middlewareC);

        var unsubscribe = store.subscribe(function () {
            expect(store.getState().middlewareChain).toEqual(["middleware-A", "middleware-C", "middleware-B"]);
            unsubscribe();
        });

        store.dispatch({
            type: ACTION
        });

        removeFn();
    });

    test("middleware init use dispatch", function () {
        var middlewareError = function middlewareError(store) {
            store.dispatch({
                type: ACTION
            });
            return function (next) {
                return function (action) {
                    next(action);
                };
            };
        };

        expect(function () {
            return store.$middleware.insertAfter("A", middlewareError);
        }).toThrow();
    });
});