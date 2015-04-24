/**
 * Main site module declaration including ui templates.
 */
angular
    .module("site", [
        "common"
    ])
    .config(function ($stateProvider, $urlRouterProvider) {

        // Otherwise
        $urlRouterProvider.otherwise('/404');

        // Home
        $stateProvider

            // Home page
            .state("home", {
                url: "/",
                templateUrl: "app/site/partials/home.html",
                controller: "LandingPageController",
                title: "Change the way you spend your money"
            })
            .state("privacy", {
                url: "/privacy",
                templateUrl: "app/site/partials/privacy.html",
                title: "Privacy - Revaluate"
            })
            .state("about", {
                url: "/about",
                templateUrl: "app/site/partials/about.html",
                title: "About - Revaluate"
            })
            .state("404", {
                url: "/404",
                templateUrl: "app/site/partials/404.html",
                controller: "Error404PageController",
                title: "Hmm... looks like a 404"
            })
            .state("500", {
                url: "/500",
                templateUrl: "app/site/partials/500.html",
                controller: "Error500PageController",
                title: "Oops... You found a 500"
            });
    });
