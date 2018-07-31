'use strict';

var _index = require('../index');

describe("index", function () {
  test('define', function () {
    expect(_index.Provider).toBeDefined();
    expect(_index.Model).toBeDefined();
    expect(_index.View).toBeDefined();
    expect(_index.connect).toBeDefined();
    expect(_index.modelUtils).toBeDefined();
    expect(_index.createStore).toBeDefined();
    expect(_index.applyMiddleware).toBeDefined();
    expect(_index.CONSTANTS).toBeDefined();
  });
});