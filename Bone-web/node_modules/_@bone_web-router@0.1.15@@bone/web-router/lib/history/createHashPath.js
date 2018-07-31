"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (location) {
    var pathname = location.pathname,
        search = location.search,
        hash = location.hash,
        key = location.key;


    var path = pathname || "/";

    if (key) {
        path = "/::" + key + "::" + path;
    }

    if (search && search !== "?") path += search.charAt(0) === "?" ? search : "?" + search;

    if (hash && hash !== "#") path += hash.charAt(0) === "#" ? hash : "#" + hash;

    return path;
};