/**
 * Main site module declaration including ui templates.
 */
angular
    .module("expenses", [
        "ui.router",
        "angular-ladda",
        "common"
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

                    'list': {
                        templateUrl: "app/expenses/partials/expense/expenses.list.html",
                        controller: "ExpenseListCtrl",
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

            // Review case
            .state("expenses.update", {
                url: "/{expenseId}/update",
                views: {

                    'action': {
                        controller: "ExpenseAutoEditCtrl",
                        resolve: {
                            expenseToReview: function ($stateParams, $q, $state, ExpenseService) {
                                var deferred = $q.defer();

                                ExpenseService
                                    .getDetails($stateParams.expenseId)
                                    .then(function (response) {
                                        deferred.resolve(response);

                                        return response;
                                    })
                                    .catch(function (response) {

                                        $state.go("expenses.regular");
                                        return response;
                                    });

                                return deferred.promise;
                            }
                        }

                    },

                    'list': {
                        templateUrl: "app/expenses/partials/expense/expenses.list.html",
                        controller: "ExpenseListCtrl",
                        resolve: {
                            pastAndUpcomingExpenses: function (ExpenseService) {
                                return ExpenseService
                                    .getAllExpensesGrouped();
                            }
                        }
                    }
                },
                title: "Preview expense - Revaluate"
            })

            // Opened modal
            .state("expenses.new", {
                url: "/new",
                views: {

                    'list': {
                        templateUrl: "app/expenses/partials/expense/expenses.list.html",
                        controller: "ExpenseListCtrl",
                        resolve: {
                            pastAndUpcomingExpenses: function (ExpenseService) {
                                return ExpenseService
                                    .getAllExpensesGrouped();
                            }
                        }
                    }
                },
                title: "Preview expense - Revaluate"
            })

    }]);