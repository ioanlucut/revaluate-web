'use strict';

/**
 * Main site module declaration including ui templates.
 */
angular
    .module("revaluate.site", [
        "revaluate.common"
    ])
    .config(function ($stateProvider, $urlRouterProvider, MIXPANEL_EVENTS) {

        // Otherwise
        $urlRouterProvider.otherwise('/404');

        // Home
        $stateProvider

            // Home page
            .state("home", {
                url: "/",
                templateUrl: "/app/site/partials/home.html",
                title: "Personal finance simplified - Revaluate",
                mixpanelId: MIXPANEL_EVENTS.homePage,
                isPublicPage: true
            })
            .state("pricing", {
                url: "/pricing",
                templateUrl: "/app/site/partials/pricing.html",
                title: "Personal finance simplified - Revaluate",
                mixpanelId: MIXPANEL_EVENTS.pricingPage,
                isPublicPage: true
            })
            .state("privacy", {
                url: "/privacy",
                templateUrl: "/app/site/partials/privacy.html",
                title: "Privacy - Revaluate",
                mixpanelId: MIXPANEL_EVENTS.privacyPage,
                isPublicPage: true
            })
            .state("terms", {
                url: "/terms",
                templateUrl: "/app/site/partials/terms.html",
                title: "Terms of Use - Revaluate",
                pageId: "terms",
                isPublicPage: true
            })
            .state("404", {
                url: "/404",
                templateUrl: "/app/site/partials/404.html",
                controller: "Error404PageController",
                title: "Hmm... looks like a 404",
                mixpanelId: MIXPANEL_EVENTS.error404,
                isPublicPage: true
            })
            .state("500", {
                url: "/500",
                templateUrl: "/app/site/partials/500.html",
                controller: "Error500PageController",
                title: "Oops... You found a 500",
                mixpanelId: MIXPANEL_EVENTS.error500,
                isPublicPage: true
            });
    });
