"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (history, checkKey, getKey, keyLength) {
    var status = {
        pathChanged: false,
        hashChanged: false
    };

    var lastLocation = history.location;

    history.listen(function () {
        status.hashChanged = false;
        // 如果pathname、search都没变，则保持一样的key
        // 并且不触发path change
        // 如果想监听hash改变，使用listen("hash", listener)
        if (history.location.pathname === lastLocation.pathname && history.location.search === lastLocation.search) {
            checkKey(lastLocation.key);

            status.pathChanged = false;

            if (history.location.hash !== lastLocation.hash) {
                status.hashChanged = true;
            }
        } else {
            checkKey(keyLength);

            status.pathChanged = true;
        }

        history.location.key = getKey();

        lastLocation = history.location;
    });

    return function (type, listener) {
        if (typeof type === "function") {
            listener = type;
            type = "path";
        }

        switch (type) {
            case "path":
                return history.listen(function () {
                    if (status.pathChanged) {
                        return listener.apply(undefined, arguments);
                    }
                });
            case "hash":
                return history.listen(function () {
                    if (status.hashChanged) {
                        return listener.apply(undefined, arguments);
                    }
                });
                break;
            case "all":
                return history.listen(function () {
                    if (status.pathChanged || status.hashChanged) {
                        return listener.apply(undefined, arguments);
                    }
                });
                break;
        }
    };
};