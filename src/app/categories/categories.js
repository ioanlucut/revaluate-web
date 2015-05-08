angular
    .module("categories", [
        "color",
        "common"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider

            // ---
            // Categories page.
            // ---
            .state({
                name: "settings.categories",
                url: "/categories",
                templateUrl: "app/categories/partials/categories.html",
                controller: "CategoryListController",
                resolve: {
                    categories: function (CategoryService) {
                        return CategoryService.getAllCategories();
                    },
                    colors: function (ColorService) {
                        return ColorService.getAllColors();
                    }
                },
                title: "Categories - Revaluate"
            });

    }]);