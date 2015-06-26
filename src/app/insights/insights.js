angular
    .module("insights", [
        "common",
        "expenses"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider
            .state("insights", {
                url: "/insights",
                templateUrl: 'app/insights/partials/insights.html',
                controller: "InsightsController",
                resolve: {
                    expenses: function (ExpenseService) {
                        return ExpenseService.getAllExpenses();
                    },
                    categories: function (CategoryService) {
                        return CategoryService.getAllCategories();
                    }
                },
                title: "Insights - Revaluate"
            })

    }]);