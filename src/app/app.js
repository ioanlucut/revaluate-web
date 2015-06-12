'use strict';

/**
 * Main app module declaration.
 */
angular
    .module("revaluate", [
        "braintree-angular",
        "angular-cache",
        "angularFileUpload",
        "ngAnimate",
        "ngMessages",
        "ngStorage",
        "ngSanitize",
        "revaluate.site",
        "revaluate.feedback",
        "revaluate.common",
        "revaluate.categories",
        "revaluate.expensesImport",
        "revaluate.expenses",
        "revaluate.statistics",
        "revaluate.account",
        "revaluate.settings",
        "revaluate.insights",
        "angular.filter",
        "ui.gravatar",
        "angularPayments",
        "pascalprecht.translate",
        "ui.select"
    ])
    .config(function ($locationProvider, $translateProvider, CacheFactoryProvider, gravatarServiceProvider) {
        angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });

        // Enable html5 mode
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // ---
        // Gravatar configs.
        // ---
        gravatarServiceProvider.defaults = {
            size: 100,
            "default": 'mm'
        };

        // Use https endpoint
        gravatarServiceProvider.secure = true;

        // ---
        // Angular translation.
        // ---
        $translateProvider.preferredLanguage('en');

        // ---
        // Angular translations.
        // ---
        $translateProvider.translations('en', ({
            'HOME': {
                'TITLE_TEXT': 'Start spending your money better!',
                'DESCRIPTION_TEXT': 'Personal finance simplified.'
            }
        }));
    })
    .run(function (ENV) {

        URLTo.apiBase(ENV.apiEndpoint);
    });
