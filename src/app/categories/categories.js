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
                resolve: {
                    categories: function (CategoryService) {
                        return CategoryService.getAllCategories();
                    },
                    colors: function (APP_CONFIG) {
                        return APP_CONFIG.ALL_COLORS;
                    }
                },
                title: "Categories - Revaluate",
                mixpanelId: MIXPANEL_EVENTS.categoriesPage
            });

    });
