(function () {
    'use strict';

    var EC = require('protractor').ExpectedConditions;

    // ---
    // Test utils.
    // ---
    exports
        .waitForDeferredAngular = function () {
        var TIMEOUT = 2000;

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
        return browser
            .driver
            .get(browser.baseUrl + uri);
    };

    exports
        .waitToShow = function (element) {
        browser.wait(EC.presenceOf(element), 5000);
    };

    exports
        .urlChangedAndContains = function (expectedUrl) {
        function urlWasChanged(url) {
            return function () {
                return browser
                    .getCurrentUrl()
                    .then(function (actualUrl) {
                        return _.contains(actualUrl, url);
                    });
            };
        }

        browser.wait(urlWasChanged(expectedUrl), 5000);
    }
}());
