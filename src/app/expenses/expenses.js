(function () {
    'use strict';

    /**
     * Main site module declaration including ui templates.
     */
    angular
        .module('revaluate.expenses', [
            'revaluate.common',
            'revaluate.account',
            'revaluate.statistics'
        ])
        .config(function ($stateProvider, USER_ACTIVITY_EVENTS) {

            $stateProvider

                .state('expenses', {
                    url: '/expenses',
                    templateUrl: '/app/expenses/partials/expenses.abstract.html',
                    abstract: true
                })

                // Regular case
                .state('expenses.regular', {
                    url: '',
                    views: {
                        "expenses__content": {
                            templateUrl: '/app/expenses/partials/expenses__content.html',
                            controller: 'ExpensesController',
                            resolve: {
                                expensesQueryResponse: function (ExpenseService) {
                                    return ExpenseService.getAllExpensesGrouped(0, 50);
                                },

                                categories: function (CategoryService) {
                                    return CategoryService.getAllCategories();
                                }
                            },
                            controllerAs: 'vm'
                        },
                        'right__content': {
                            templateUrl: '/app/insights/partials/insights.daily.html',
                            controller: 'InsightsDailyController',
                            controllerAs: 'vm',
                            resolve: {
                                monthsPerYearsStatistics: function (StatisticService) {
                                    return StatisticService
                                        .fetchInsightsMonthsPerYearStatistics();
                                },

                                insightsDaily: function (DatesUtils, InsightsService) {
                                    var period = DatesUtils.fromLastMonthsToNow(1);

                                    return InsightsService
                                        .fetchDailyInsightsFromTo(period.from, period.to);
                                }
                            },
                            title: 'Insights daily - Revaluate',
                            stateEventName: USER_ACTIVITY_EVENTS.insightsPage
                        }
                    },
                    title: 'Expenses - Revaluate',
                    stateEventName: USER_ACTIVITY_EVENTS.expensesPage
                });

        });
}());
