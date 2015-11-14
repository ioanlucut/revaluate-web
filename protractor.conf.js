'use strict';

var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths,
    utils = require('./e2e/utils');

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
        var environment = browser.params.env || 'local-dev',
            myConfig = require('./gulp/app.config.' + environment + '.json');
        browser.baseUrl = myConfig.ENV.frontEndUri;

        // implicit and page load timeouts
        browser.manage().timeouts().pageLoadTimeout(10000);
        browser.manage().timeouts().implicitlyWait(5000);
        browser.manage().window().setSize(1440, 900);

        // for non-angular page
        browser.ignoreSynchronization = true;
    }

};
