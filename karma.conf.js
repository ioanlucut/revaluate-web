module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            "bower_components/jquery/dist/jquery.js",
            "bower_components/lodash/lodash.js",
            "bower_components/mousetrap/mousetrap.js",
            "bower_components/moment/moment.js",
            "bower_components/url-to/url-to.js",
            "bower_components/angular/angular.js",
            "bower_components/angular-animate/angular-animate.js",
            "bower_components/angular-sanitize/angular-sanitize.js",
            "bower_components/angular-i18n/angular-locale_en.js",
            "bower_components/angular-ui-router/release/angular-ui-router.js",
            "bower_components/angular-inflector/dist/angular-inflector.js",
            "bower_components/angular-messages/angular-messages.js",
            "bower_components/angular-flash/dist/angular-flash.js",
            "bower_components/jstz-detect/jstz.js",
            "bower_components/angular-cache/dist/angular-cache.js",
            "bower_components/angular-file-upload/angular-file-upload.js",

            "bower_components/es5-shim/es5-shim.js",
            "bower_components/es5-shim/es5-sham.js",

            /* Braintree angular component */
            "bower_components/braintree-angular/dist/braintree-angular.js",

            /* These are the angular ui used bootstrap */
            "bower_components/angular-ui-bootstrap/src/position/position.js",
            "bower_components/angular-ui-bootstrap/src/transition/transition.js",
            "bower_components/angular-ui-bootstrap/src/dropdown/dropdown.js",
            "bower_components/angular-ui-bootstrap/src/dateparser/dateparser.js",
            "bower_components/angular-ui-bootstrap/src/datepicker/datepicker.js",
            "bower_components/angular-ui-bootstrap/src/modal/modal.js",
            "bower_components/angular-gravatar/build/angular-gravatar.js",
            "bower_components/angular-ui-select/dist/select.js",
            /* End angular ui used bootstrap */
            "bower_components/Chart.js/Chart.min.js",
            "bower_components/angular-chart.js/dist/angular-chart.js",

            "bower_components/ngstorage/ngStorage.js",
            "bower_components/angular-filter/dist/angular-filter.js",
            /* Vendor styles */
            "src/app/vendor/js/jquery.price_format.2.0.js",

            "bower_components/angular-mocks/angular-mocks.js",
            "src/app/app.env.config.js",

            "src/app/common/common.js",
            "src/app/common/**/*.js",

            "src/app/feedback/feedback.js",
            "src/app/feedback/**/*.js",

            "src/app/account/account.js",
            "src/app/account/**/*.js",

            "src/app/settings/settings.js",
            "src/app/settings/**/*.js",

            "src/app/site/site.js",
            "src/app/site/**/*.js",

            "src/app/currencies/currencies.js",
            "src/app/currencies/**/*.js",

            "src/app/color/color.js",
            "src/app/color/**/*.js",

            "src/app/categories/category.js",
            "src/app/categories/**/*.js",

            "src/app/import/import.js",
            "src/app/import/**/*.js",

            "src/app/expenses/expenses.js",
            "src/app/expenses/**/*.js",

            "src/app/statistics/statistics.js",
            "src/app/statistics/**/*.js",

            "src/app/insight/insights.js",
            "src/app/insight/**/*.js",

            "src/app/app.js",
            "src/app/app.ctrl.js",

            "build/partials/partials.js",
            "src/**/*_test.js"
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
