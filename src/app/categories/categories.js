angular
    .module("categories", [
        "common"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider
            .state("categories", {
                url: "/categories",
                templateUrl: 'app/categories/partials/categories.html',
                controller: "CategoryListCtrl",
                resolve: {
                    categories: function (CategoryService) {
                        return CategoryService.getAllCategories();
                    }
                },
                title: "Categories - Revaluate"
            })

    }]);