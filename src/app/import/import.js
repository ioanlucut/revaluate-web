angular
    .module("revaluate.expensesImport", [
        "revaluate.color",
        "revaluate.common"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider

            // ---
            // expensesImport.
            // ---
            .state("settings.expensesImport", {
                url: "/expensesImport",
                templateUrl: "app/import/partials/import.importExpenses.html",
                controller: "ExpensesImportController",
                resolve: {
                    categories: function (CategoryService) {
                        return CategoryService.getAllCategories();
                    }
                },
                title: "Expenses import - Revaluate"
            });

    }]);