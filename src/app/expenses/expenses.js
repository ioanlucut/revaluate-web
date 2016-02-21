(function () {
  'use strict';

  /**
   * Main site module declaration including ui templates.
   */
  angular
    .module('revaluate.expenses', [
      'revaluate.common',
      'revaluate.account',
      'revaluate.goals',
      'revaluate.statistics',
    ])
    .config(function ($stateProvider, USER_ACTIVITY_EVENTS) {

      $stateProvider

        .state('expenses', {
          url: '/expenses',
          templateUrl: '/app/expenses/expenses/expensesAbstract.tpl.html',
          abstract: true,
        })

        // Regular case
        .state('expenses.regular', {
          url: '',
          views: {
            expensesContentView: {
              templateUrl: '/app/expenses/expenses/expensesContent.tpl.html',
              controller: 'ExpensesController',
              controllerAs: 'expensesVm',
              resolve: {
                expensesQueryResponse: function (ExpenseService) {
                  return ExpenseService.getAllExpensesGrouped(0, 50);
                },

                categories: function (CategoryService) {
                  return CategoryService.getAllCategories();
                },
              },
            },
            'expenses__daily__insights__content@expenses.regular': {
              templateUrl: '/app/expenses/monthlyDailyInsights/monthlyDailyInsights.tpl.html',
              controller: 'MonthlyDailyInsightsController',
              controllerAs: 'vm',
              resolve: {
                insightsDaily: function (DatesUtils, InsightsService) {
                  var period = DatesUtils.fromLastMonthsToNow(1);

                  return InsightsService
                    .fetchDailyInsightsFromTo(period.from, period.to);
                },
              },
            },
            'expenses__goals__content@expenses.regular': {
              templateUrl: '/app/expenses/monthlyGoals/monthlyGoals.tpl.html',
              controller: 'MonthlyGoalsController',
              controllerAs: 'vm',
              resolve: {
                goals: function (GoalService, DatesUtils) {
                  var period = DatesUtils.fromLastMonthsToNow(1);

                  return GoalService
                    .getAllGoalsFromTo(period.from, period.to);
                },
              },
            },
          },
          title: 'Expenses - Revaluate',
          stateEventName: USER_ACTIVITY_EVENTS.expensesPage,
        });

    });
}());
