(function () {
    'use strict';

    // ---
    // Test utils.
    // ---
    exports
        .waitForDeferredAngular = function () {
        var TIMEOUT = 10000;

        return browser.driver
            .wait(function () {
                return element(by.css('.deferred-bootstrap-loading'))
                    .then(function () {
                        return browser.driver
                            .wait(function () {
                                return element(by.css('.deferred-bootstrap-error'))
                                    .then(function (el) {
                                        // errors during bootstrap, fail
                                        return false;
                                    }, function (err) {
                                        // no errors, loading done and no errors found
                                        return true;
                                    });
                            });
                    }, function () {
                        // It has probably already bootstrapped, we just got to the party late
                        return true;
                    });
            }, TIMEOUT);
    };

    exports
        .getWhileWait = function (uri) {
        var that = this;

        return browser
            .driver
            .get(browser.baseUrl + uri)
            .then(function () {
                that.waitForDeferredAngular();
            });
    }
}());
