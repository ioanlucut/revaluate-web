export default function MonthlyDailyInsightsController(EXPENSE_EVENTS,
                                                       USER_ACTIVITY_EVENTS,
                                                       ALERTS_EVENTS,
                                                       $controller,
                                                       $scope,
                                                       $rootScope,
                                                       $filter,
                                                       InsightsGenerator,
                                                       DatesUtils,
                                                       InsightsService,
                                                       promiseTracker,
                                                       insightsDaily) {

  const vm = this;

  /**
   * Insights current year
   */
  vm.currentYear = moment().year();

  /**
   * Default insights daily.
   */
  vm.insightsDaily = insightsDaily;

  // ---
  // Inherit from parent controller.
  // ---
  angular.extend(this, $controller('InsightsAbstractController', {
    $scope,
    $rootScope,
    $filter,
    monthsPerYearsStatistics: null,
    resizeOnUpdate: false,
    getChartSetSize() {
    },
  }));

  // ---
  // Customize look.
  // ---
  vm.barOptions = angular.extend(vm.barOptions, {
    scaleLabel(label) {
      return vm.formatChartValue(label);
    },

    multiTooltipTemplate(label) {
      return vm.formatChartValue(label);
    },

    tooltipTemplate(label) {
      return vm.formatChartValue(label);
    },

    scaleShowHorizontalLines: false,
    scaleShowVerticalLines: false,
    scaleShowLabels: false,
    scaleShowGridLines: false,
    showScale: true,
    scaleFontSize: 10,
    tooltipFontSize: 12,
    tooltipTitleFontSize: 12,
    tooltipYPadding: 10,
    tooltipXPadding: 10,
    barValueSpacing: 2,
  });

  /**
   * Load insights
   */
  vm.loadInsights = loadInsights;

  /**
   * Create a saving tracker.
   */
  vm.loadTracker = promiseTracker();

  // ---
  // Computed information and methods.
  // ---
  prepareDataForChart();

  function loadInsights() {
    const period = DatesUtils
      .fromLastMonthsToNow(1);

    InsightsService
      .fetchDailyInsightsFromTo(period.from, period.to, vm.loadTracker)
      .then(receivedInsight => {
        // ---
        // Update everything.
        // ---
        vm.insightsDaily = receivedInsight;

        prepareDataForChart();
        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.insightsDailyFetched);
      })
      .catch(() => {
        vm.badPostSubmitResponse = true;
        $scope.$emit(ALERTS_EVENTS.DANGER, {
          message: 'Could not fetch insights.',
        });
      });
  }

  /**
   * Prepares data for chart
   */
  function prepareDataForChart() {
    // ---
    // Computed information and methods.
    // ---
    vm.barInsightsPrepared = InsightsGenerator
      .generateDailyBar(vm.currentYear, vm.insightsDaily);

    $scope.$emit('chartsLoaded', { size: vm.barInsightsPrepared.insightsBarData[0].length });
  }

  // ---
  // Reload chart if necessary upon delete/update/create..
  // ---

  $scope.$on(EXPENSE_EVENTS.isCreated, (event, args) => {
    tryToReloadIfNecessary(args);
  });

  $scope.$on(EXPENSE_EVENTS.isDeleted, (event, args) => {
    tryToReloadIfNecessary(args);
  });

  $scope.$on(EXPENSE_EVENTS.isUpdated, (event, args) => {
    tryToReloadIfNecessary(args);
  });

  function tryToReloadIfNecessary(args) {
    if (args.expense) {
      reloadIfRequired(args.expense);
    } else if (args.expenses) {
      _.each(args.expenses, expenseCandidate => {
        reloadIfRequired(expenseCandidate);
      });
    }
  }

  function reloadIfRequired(expense) {
    const isSameMonth = moment().isSame(moment(expense.spentDate), 'month');

    if (isSameMonth) {
      vm.loadInsights();
    }
  }

}
