/**
 * Main app module declaration.
 */
angular
    .module("app", [
        "config",
        "angular-cache",
        "angularFileUpload",
        "ngAnimate",
        "ngMessages",
        "angucomplete-alt",
        "ngStorage",
        "partials",
        "site",
        "feedback",
        "common",
        "categories",
        "expenses",
        "statistics",
        "account",
        "settings",
        "insights",
        "angular.filter"
    ])
    .config(function ($locationProvider, CacheFactoryProvider) {
        angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });

        // Enable html5 mode
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .run(function (ENV) {

        URLTo.apiBase(ENV.apiEndpoint);
    });