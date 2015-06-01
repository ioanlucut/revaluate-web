/**
 * Main app module declaration.
 */
angular
    .module("app", [
        "config",
        "braintree-angular",
        "angular-cache",
        "angularFileUpload",
        "ngAnimate",
        "ngMessages",
        "angucomplete-alt",
        "ngStorage",
        "partials",
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
        "ui.gravatar"
    ])
    .config(function ($locationProvider, CacheFactoryProvider, gravatarServiceProvider) {
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
    })
    .run(function (ENV) {

        URLTo.apiBase(ENV.apiEndpoint);
    });