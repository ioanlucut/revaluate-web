function MonthlyDailyInsightsController(EXPENSE_EVENTS,
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
  'ngInject';

  const _this = this;

  /**
   * Insights current year
   */
  _this.currentYear = moment().year();

  /**
   * Default insights daily.
   */
  _this.insightsDaily = insightsDaily;

  // ---
  // Inherit from parent controller.
  // ---
  angular.extend(this, $controller('InsightsAbstractController', {
    $scope,
    $rootScope,
    $filter,
    monthsPerYearsStatistics: null,
    resizeOnUpdate: false,
  }));

  // ---
  // Customize look.
  // ---
  _this.barOptions = angular.extend(_this.barOptions, {
    scaleLabel(label) {
      return _this.formatChartValue(label);
    },

    multiTooltipTemplate(label) {
      return _this.formatChartValue(label);
    },

    tooltipTemplate(label) {
      return _this.formatChartValue(label);
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
  _this.loadInsights = loadInsights;

  /**
   * Create a saving tracker.
   */
  _this.loadTracker = promiseTracker();

  // ---
  // Computed information and methods.
  // ---
  prepareDataForChart();

  function loadInsights() {
    const period = DatesUtils
      .fromLastMonthsToNow(1);

    InsightsService
      .fetchDailyInsightsFromTo(period.from, period.to, _this.loadTracker)
      .then(receivedInsight => {
        // ---
        // Update everything.
        // ---
        _this.insightsDaily = receivedInsight;

        prepareDataForChart();
        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.insightsDailyFetched);
      })
      .catch(() => {
        _this.badPostSubmitResponse = true;
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
    _this.barInsightsPrepared = InsightsGenerator
      .generateDailyBar(_this.currentYear, _this.insightsDaily);

    $scope.$emit(
      'chartsLoaded',
      { size: _this.barInsightsPrepared.insightsBarData[0].length }
    );
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
      _this.loadInsights();
    }
  }

}

export default MonthlyDailyInsightsController;
