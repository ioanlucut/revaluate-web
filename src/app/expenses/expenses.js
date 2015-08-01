(function () {
    "use strict";

    /**
     * Main site module declaration including ui templates.
     */
    angular
        .module("revaluate.expenses", [
            "revaluate.common",
            "revaluate.account",
            "revaluate.statistics"
        ])
        .config(function ($stateProvider, USER_ACTIVITY_EVENTS) {

            $stateProvider

                .state("expenses", {
                    url: "/expenses",
                    templateUrl: "/app/expenses/partials/expense/expenses.abstract.html",
                    abstract: true
                })

                // Regular case
                .state("expenses.regular", {
                    url: "",
                    views: {
                        "expenses": {
                            templateUrl: "/app/expenses/partials/expense/expenses.html",
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
                    title: "Expenses - Revaluate",
                    stateEventName: USER_ACTIVITY_EVENTS.expensesPage
                });

        });
}());
