import goalAddDirective from './goalAdd/goalAddDirective';
import goalDailyStatusDirective from './goalDailyStatus/goalDailyStatusDirective';
import goalEntryDirective from './goalEntry/goalEntryDirective';
import goalStatus from './goalStatus/goalStatus';
import goalStatusProgressBarDirective from './goalStatusProgressBar/goalStatusProgressBarDirective';
import GoalService from './goals/GoalService';
import GoalsController from './goals/GoalsController';
import goal from './goals/goal';
import goalsEventsConstants from './goals/goalsEventsConstants';
import goalsUrlsConstants from './goals/goalsUrlsConstants';
import goalsDisplayEntry from './goalsDisplayEntry/goalsDisplayEntry';
import goalsListDirective from './goalsList/goalsListDirective';
import GoalMessagesService from './services/GoalMessagesService';
import GoalProgressTypeService from './services/GoalProgressTypeService';
import GoalTransformerService from './services/GoalTransformerService';
import goalsMessagesConstants from './goalsMessages/goalsMessagesConstants';
import goalsMessagesFilter from './goalsMessages/goalsMessagesFilter';
import uniqueCategoryPerGoalDirective from './common/directives/uniqueCategoryPerGoalDirective';
import goalTargetFilter from './common/filter/goalTargetFilter';

/**
 * Main site module declaration including ui templates.
 */
export default angular
  .module('revaluate.goals', [
    'revaluate.common',
    'revaluate.account',
    'revaluate.insights',
    'revaluate.statistics',
  ])
  .directive('goalAdd', goalAddDirective)
  .directive('goalDailyStatus', goalDailyStatusDirective)
  .directive('goalEntry', goalEntryDirective)
  .factory('GoalStatus', goalStatus)
  .directive('goalStatusProgressBar', goalStatusProgressBarDirective)
  .service('GoalService', GoalService)
  .controller('GoalsController', GoalsController)
  .factory('Goal', goal)
  .constant('GOAL_EVENTS', goalsEventsConstants)
  .constant('GOAL_URLS', goalsUrlsConstants)
  .component('goalsDisplayEntry', goalsDisplayEntry)
  .service('GoalMessagesService', GoalMessagesService)
  .directive('goalsList', goalsListDirective)
  .service('GoalProgressTypeService', GoalProgressTypeService)
  .service('GoalTransformerService', GoalTransformerService)
  .constant('GOALS_MESSAGES_CONSTANTS', goalsMessagesConstants)
  .filter('goalMessage', goalsMessagesFilter)
  .directive('uniqueCategoryPerGoal', uniqueCategoryPerGoalDirective)
  .filter('goalTarget', goalTargetFilter)
  .config(($stateProvider, USER_ACTIVITY_EVENTS) => {
    'ngInject';

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
          monthsPerYearsStatistics(StatisticService) {
            return StatisticService
              .fetchGoalsMonthsPerYearStatistics();
          },

          goals(GoalService, DatesUtils) {
            const period = DatesUtils.fromLastMonthsToNow(1);

            return GoalService
              .getAllGoalsFromTo(period.from, period.to);
          },

          categories(CategoryService) {
            return CategoryService.getAllCategories();
          },
        },
        controllerAs: 'vm',
        title: 'Goals - Revaluate',
        stateEventName: USER_ACTIVITY_EVENTS.goalsPage,
      });

  });
