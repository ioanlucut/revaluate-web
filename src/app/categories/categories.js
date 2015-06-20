'use strict';

angular
    .module("revaluate.categories", [
        "revaluate.common"
    ])
    .config(function ($stateProvider, MIXPANEL_EVENTS) {

        $stateProvider

            // ---
            // Categories page.
            // ---
            .state({
                name: "settings.categories",
                url: "/categories",
                templateUrl: "/app/categories/partials/categories.html",
                controller: "CategoryListController",
                isPaymentMissingUnrestrictedPage: true,
                resolve: {
                    categories: function (CategoryService) {
                        return CategoryService.getAllCategories();
                    }
                },
                title: "Categories - Revaluate",
                mixpanelId: MIXPANEL_EVENTS.categoriesPage
            });

    });
