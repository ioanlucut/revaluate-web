import InsightsGenerator from './insights/InsightsGenerator';
import InsightsService from './insights/InsightsService';
import InsightsTransformerService from './insights/InsightsTransformerService';
import insightsConstants from './insights/insightsConstants';
import insightsIntervalConstants from './insights/insightsIntervalConstants';
import insightsChartsConstants from './insights/insightsChartsConstants';
import insightsDaily from './insightsDaily/insightsDaily';
import InsightsAbstractController from './insightsAbstract/InsightsAbstractController';
import insightsAbstract from './insightsAbstract/insightsAbstract';
import InsightsMonthlyController from './insightsMonthly/InsightsMonthlyController';
import insightsMonthly from './insightsMonthly/insightsMonthly';
import InsightsOverviewController from './insightsOverview/InsightsOverviewController';
import insightsOverview from './insightsOverview/insightsOverview';
import InsightsProgressController from './insightsProgress/InsightsProgressController';
import insightsProgress from './insightsProgress/insightsProgress';
import insightsEmptyStateToggleDirective from './insightsEmptyState/insightsEmptyStateToggleDirective';

export default angular
  .module('revaluate.insights', [
    'revaluate.common',
    'revaluate.categories',
    'revaluate.expenses',
  ])
  .service('InsightsGenerator', InsightsGenerator)
  .service('InsightsService', InsightsService)
  .service('InsightsTransformerService', InsightsTransformerService)
  .constant('INSIGHTS_URLS', insightsConstants)
  .constant('INSIGHTS_INTERVAL', insightsIntervalConstants)
  .constant('INSIGHTS_CHARTS', insightsChartsConstants)
  .factory('InsightsDaily', insightsDaily)
  .controller('InsightsAbstractController', InsightsAbstractController)
  .factory('InsightsAbstract', insightsAbstract)
  .controller('InsightsMonthlyController', InsightsMonthlyController)
  .factory('InsightsMonthly', insightsMonthly)
  .controller('InsightsOverviewController', InsightsOverviewController)
  .factory('InsightsOverview', insightsOverview)
  .controller('InsightsProgressController', InsightsProgressController)
  .factory('InsightsProgress', insightsProgress)
  .directive('insightsEmptyStateToggle', insightsEmptyStateToggleDirective)
  .config(($stateProvider, USER_ACTIVITY_EVENTS) => {
    'ngInject';

    $stateProvider

    // ---
    // Abstract state - insights.
    // ---
      .state({
        name: 'insights',
        url: '/insights',
        templateUrl: '/app/components/insights/insightsAbstract/insightsAbstract.html',
        abstract: true,
      })

      // ---
      // Monthly page.
      // ---
      .state({
        name: 'insights.monthly',
        url: '/monthly',
        templateUrl: '/app/components/insights/insightsMonthly/insightsMonthly.html',
        controller: 'InsightsMonthlyController',
        controllerAs: 'vm',
        resolve: {
          insightsMonthly(DatesUtils, InsightsService) {
            const period = DatesUtils.fromLastMonthsToNow(1);

            return InsightsService
              .fetchMonthlyInsightsFromTo(period.from, period.to);
          },

          monthsPerYearsStatistics(StatisticService) {
            return StatisticService
              .fetchExpensesMonthsPerYearStatistics();
          },
        },
        title: 'Insights monthly - Revaluate',
        stateEventName: USER_ACTIVITY_EVENTS.insightsPage,
      })

      // ---
      // Overview page.
      // ---
      .state({
        name: 'insights.overview',
        url: '/overview',
        templateUrl: '/app/components/insights/insightsOverview/insightsOverview.html',
        controller: 'InsightsOverviewController',
        controllerAs: 'vm',
        resolve: {
          insightsOverview(DatesUtils, InsightsService, INSIGHTS_INTERVAL) {
            const period = DatesUtils.fromLastMonthsToNow(INSIGHTS_INTERVAL.HALF_YEAR);

            return InsightsService
              .fetchOverviewInsightsFromTo(period.from, period.to);
          },

          monthsPerYearsStatistics(StatisticService) {
            return StatisticService
              .fetchExpensesMonthsPerYearStatistics();
          },
        },
        title: 'Insights overview - Revaluate',
        stateEventName: USER_ACTIVITY_EVENTS.insightsPage,
      })

      // ---
      // Progress page.
      // ---
      .state({
        name: 'insights.progress',
        url: '/progress',
        templateUrl: '/app/components/insights/insightsProgress/insightsProgress.html',
        controller: 'InsightsProgressController',
        controllerAs: 'vm',
        resolve: {
          insightsProgress(DatesUtils, InsightsService, INSIGHTS_INTERVAL) {
            const period = DatesUtils.fromLastMonthsToNow(INSIGHTS_INTERVAL.HALF_YEAR);

            return InsightsService
              .fetchProgressInsightsFromTo(period.from, period.to);
          },

          monthsPerYearsStatistics(StatisticService) {
            return StatisticService
              .fetchExpensesMonthsPerYearStatistics();
          },

          categories(CategoryService) {
            return CategoryService.getAllCategories();
          },
        },
        title: 'Insights progress - Revaluate',
        stateEventName: USER_ACTIVITY_EVENTS.insightsPage,
      });

  });
