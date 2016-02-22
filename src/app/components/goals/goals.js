(function () {
  'use strict';

  /**
   * Main site module declaration including ui templates.
   */
  angular
    .module('revaluate.goals', [
      'revaluate.common',
      'revaluate.account',
      'revaluate.insights',
      'revaluate.statistics',
    ])
    .config(function ($stateProvider, USER_ACTIVITY_EVENTS) {

      $stateProvider

        .state('goals', {
          url: '/goals',
          templateUrl: '/app/components/goals/goals/goalsAbstract.html',
          abstract: true,
        })

        // Regular case
        .state('goals.regular', {
          url: '',
          templateUrl: '/app/components/goals/goals/goalsContent.tpl.html',
          controller: 'GoalsController',
          resolve: {
            monthsPerYearsStatistics: function (StatisticService) {
              return StatisticService
                .fetchGoalsMonthsPerYearStatistics();
            },

            goals: function (GoalService, DatesUtils) {
              var period = DatesUtils.fromLastMonthsToNow(1);

              return GoalService
                .getAllGoalsFromTo(period.from, period.to);
            },

            categories: function (CategoryService) {
              return CategoryService.getAllCategories();
            },
          },
          controllerAs: 'vm',
          title: 'Goals - Revaluate',
          stateEventName: USER_ACTIVITY_EVENTS.goalsPage,
        });

    });
}());
