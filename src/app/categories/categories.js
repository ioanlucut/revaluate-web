'use strict';

angular
    .module("revaluate.categories", [
        "revaluate.common",
        "revaluate.color"
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
                    colors: function (ColorService) {
                        return ColorService.getAllColors();
                    }
                },
                title: "Categories - Revaluate",
                mixpanelId: MIXPANEL_EVENTS.categoriesPage
            });

    });
