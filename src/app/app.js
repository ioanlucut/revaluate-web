/**
 * Main app module declaration.
 */
angular
    .module("app", [
        "config",
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
        "insights",
        "angular.filter"
    ])
    .config(function ($locationProvider) {

        // Enable html5 mode
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .run(function (ENV) {

        URLTo.apiBase(ENV.apiEndpoint);
    });