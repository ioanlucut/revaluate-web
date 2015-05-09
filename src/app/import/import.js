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
                    currencies: function (CurrencyService) {
                        return CurrencyService.getAllCurrencies();
                    }
                },
                title: "Expenses import - Revaluate"
            });

    }]);