/**
 * Main site module declaration including ui templates.
 */
angular
    .module("expenses", [
        "common",
        "statistics"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider

            .state("expenses", {
                url: "/expenses",
                templateUrl: 'app/expenses/partials/expense/expenses.template.html',
                abstract: true
            })

            // Regular case
            .state("expenses.regular", {
                url: "",
                views: {
                    'expenses': {
                        templateUrl: "app/expenses/partials/expense/expenses.html",
                        controller: "ExpenseController",
                        resolve: {
                            expenses: function (ExpenseService) {
                                return ExpenseService.getAllExpenses();
                            },
                            categories: function (CategoryService) {
                                return CategoryService.getAllCategories();
                            }
                        }
                    }
                },
                title: "Expenses - Revaluate"
            })

    }]);