function InsightsProgressController(DatesUtils,
                                    $controller,
                                    $templateCache,
                                    $scope,
                                    $rootScope,
                                    $filter,
                                    $timeout,
                                    InsightsGenerator,
                                    ALERTS_EVENTS,
                                    INSIGHTS_INTERVAL,
                                    insightsProgress,
                                    monthsPerYearsStatistics,
                                    categories,
                                    InsightsService,
                                    USER_ACTIVITY_EVENTS,
                                    INSIGHTS_CHARTS,
                                    ALERTS_CONSTANTS) {

  const TIMEOUT_DURATION = 150, _this = this;

  /**
   * Alert identifier
   */
  _this.alertId = ALERTS_CONSTANTS.insights;

  /**
   * Insights interval
   */
  _this.INSIGHTS_INTERVAL = INSIGHTS_INTERVAL;

  /**
   * Existing categories.
   */
  _this.categories = categories;

  /**
   * Just make a copy of master categories
   */
  _this.masterCategories = angular.copy(_this.categories);

  /**
   * Default insights progress.
   */
  _this.insightsProgress = insightsProgress;

  /**
   * Default active interval selected.
   * @type {number}
   */
  _this.activeInterval = _this.INSIGHTS_INTERVAL.HALF_YEAR;

  // ---
  // Inherit from parent controller.
  // ---
  angular.extend(this, $controller('InsightsAbstractController', {
    $scope,
    $rootScope,
    $filter,
    monthsPerYearsStatistics,
    resizeOnUpdate: false,
    getChartSetSize() {
    },
  }));

  // ---
  // Update the options.
  // ---
  _this.lineOptions = _.extend(_this.barOptions, {
    datasetFill: false, animation: false, animationSteps: 30,
  });

  /**
   * Toggle category selection
   */
  _this.toggleAndReloadInsights = category => {
    category.selected = !category.selected;

    prepareDataForProgressChart();
  };

  /**
   * Prepares data for progress chart
   */
  function prepareDataForProgressChart() {
    if (_this.isMinimumNumberOfAllowedUnselectedCategoriesExceeded()) {
      return;
    }

    const insightsPrepared = InsightsGenerator
      .generate(_this.insightsProgress, getSelectedCategories());

    _this.insightLineData = insightsPrepared.insightLineData;
    _this.insightLabels = insightsPrepared.insightLabels;
    _this.insightLineSeries = insightsPrepared.insightLineSeries;
    _this.insightLineColors = insightsPrepared.insightLineColors;

    _this.availableYearMonths = insightsPrepared.availableYearMonths;
    _this.totalAmountPerMonths = insightsPrepared.totalAmountPerMonths;
  }

  function getSelectedCategories() {
    return _.filter(_this.masterCategories, 'selected', true);
  }

  function reloadAllCategoriesWithSelectedAs(status) {
    _.each(_this.masterCategories, category => {
      category.selected = status;
    });

    // ---
    // Computed information and methods.
    // ---
    prepareDataForProgressChart();
  }

  /**
   * At least one category should be selected
   */
  _this.isMinimumNumberOfAllowedUnselectedCategoriesExceeded = () => getSelectedCategories().length === 0;

  _this.selectAll = () => {
    if (getSelectedCategories().length < _this.masterCategories.length) {

      reloadAllCategoriesWithSelectedAs(true);
    }
  };

  _this.clearAll = () => {
    if (getSelectedCategories().length > 0) {

      reloadAllCategoriesWithSelectedAs(false);
    }
  };

  // ---
  // Populate categories with selected status.
  // ---
  reloadAllCategoriesWithSelectedAs(true);

  /**
   * Load insights
   */
  _this.loadInsights = insightsIntervalMonths => {
    if (_this.isLoading) {

      return;
    }

    _this.isLoading = true;
    const period = DatesUtils
      .fromLastMonthsToNow(insightsIntervalMonths);

    InsightsService
      .fetchProgressInsightsFromTo(period.from, period.to)
      .then(receivedInsight => {
        _this.activeInterval = insightsIntervalMonths;

        /**
         * Track event.
         */
        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.insightsProgressFetched);

        $timeout(() => {
          // ---
          // Update everything.
          // ---
          _this.insightsProgress = receivedInsight;

          // ---
          // Computed information and methods.
          // ---
          prepareDataForProgressChart();

          _this.isLoading = false;
        }, TIMEOUT_DURATION);
      })
      .catch(() => {
        _this.badPostSubmitResponse = true;
        _this.isLoading = false;

        $scope.$emit(ALERTS_EVENTS.DANGER, {
          message: 'Could not fetch insights.',
          alertId: _this.alertId,
        });
      });
  };

}

export default InsightsProgressController;
