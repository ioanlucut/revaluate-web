'use strict';

var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;

// An example configuration file.
exports.config = {
    // The address of a running selenium server.
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // The params object will be passed directly to the Protractor instance,
    // and can be accessed from your test as browser.params. It is an arbitrary
    // object and can contain anything you may need in your test.
    // This can be changed via the command line as:
    //   --params.login.user "Joe"
    params: {
        env: 'local-dev'
    },

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: [paths.e2e + '/**/*.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },

    onPrepare: function () {
        var TIMEOUT = 10000,
            environment = browser.params.env || 'local-dev',
            myConfig = require('./gulp/app.config.' + environment + '.json'),
            uri = myConfig.ENV.frontEndUri;

        browser.baseUrl = uri;

        function waitForDeferredAngular() {
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
        }

        return browser.driver
            .get(uri)
            .then(function () {
                return waitForDeferredAngular();
            });
    }

};
