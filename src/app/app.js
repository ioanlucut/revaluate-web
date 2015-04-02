/**
 * Main app module declaration.
 */
angular
    .module("app", [
        "config",
        "ngAnimate",
        "ngMessages",
        "ui.router",
        "angular-flash.service",
        "angular-flash.flash-alert-directive",
        "autocomplete",
        "ngStorage",
        "partials",
        "site",
        "feedback",
        "common",
        "categories",
        "expenses",
        "account",
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