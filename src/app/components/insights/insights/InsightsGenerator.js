function InsightsGenerator($filter) {

  this.generate = (insightsProgress, masterCategories) => {
    let availableYearMonths, totalAmountPerMonths, progressLineData, insightLineColors, insightLineSeries, insightLabels, insightLineData;

    // ---
    // First, initialize all category models with yearMonth information.
    // ---
    _.each(insightsProgress.insightsMonthlyDTO, insightsMonthlyDTOEntry => {
      _.each(masterCategories, categoryEntry => {
        categoryEntry.yearMonth = categoryEntry.yearMonth || {};
        categoryEntry.yearMonth[insightsMonthlyDTOEntry.yearMonth] = categoryEntry.yearMonth[insightsMonthlyDTOEntry.yearMonth] || 0;
      });
    });

    // ---
    // Then just fill the data.
    // ---
    _.each(insightsProgress.insightsMonthlyDTO, insightsMonthlyDTOEntry => {
      _.each(
        insightsMonthlyDTOEntry.totalPerCategoryInsightsDTOs,
        totalPerCategoryInsightsEntry => {
          const matchCategory = _.find(masterCategories, categoryEntry => categoryEntry.id === totalPerCategoryInsightsEntry.categoryDTO.id);

          if (matchCategory) {
            matchCategory.yearMonth[insightsMonthlyDTOEntry.yearMonth] = totalPerCategoryInsightsEntry.totalAmount;
          }
        }
      );
    });

    availableYearMonths = _.map(insightsProgress.insightsMonthlyDTO, insightsMonthlyDTOEntry => insightsMonthlyDTOEntry.yearMonth);

    // ---
    // Total amount of categories per month.
    // ---
    totalAmountPerMonths = _.reduce(insightsProgress.insightsMonthlyDTO, (result, insightsMonthlyDTOEntry) => {
      result[insightsMonthlyDTOEntry.yearMonth] = insightsMonthlyDTOEntry.totalAmountSpent;
      return result;
    }, {});

    // ---
    // Represents the computed line data categorised.
    // ---
    progressLineData = _.map(masterCategories, categoryEntry => {

      const totalCategoryExpensesPerYearMonth = _.map(availableYearMonths, availableYearMonthEntry => categoryEntry.yearMonth[availableYearMonthEntry]);

      return {
        totalCategoryExpensesPerYearMonth,
        categoryEntry,
      };
    });

    // ---
    // Computed information and methods.
    // ---
    insightLineData = angular.copy(_.map(progressLineData, 'totalCategoryExpensesPerYearMonth'));
    insightLabels = angular.copy(_.map(availableYearMonths, availableYearMonthsEntry => $filter('friendlyMonthShortDateNoYear')(availableYearMonthsEntry)));

    insightLineSeries = angular.copy(_.map(progressLineData, progressLineDataEntry => progressLineDataEntry.categoryEntry.name));

    insightLineColors = angular.copy(_.map(progressLineData, progressLineDataEntry => progressLineDataEntry.categoryEntry.color.color));

    return {
      insightLineData,
      insightLineColors,
      insightLabels,
      insightLineSeries,
      availableYearMonths: angular.copy(availableYearMonths),
      totalAmountPerMonths: angular.copy(totalAmountPerMonths),
    };
  };

  this.generateMonthlyBar = function (insightsMonthly) {
    let insightsBarData, insightsBarColors, insightLineSeries;

    insightsBarData = _.map(insightsMonthly.totalPerCategoryInsightsDTOs, totalPerCategoryInsightDTO => [totalPerCategoryInsightDTO.totalAmount]);

    insightsBarColors = _.map(insightsMonthly.totalPerCategoryInsightsDTOs, _.bind(function (totalPerCategoryInsightDTO) {
      return this.getColour(this.hexToRgb(totalPerCategoryInsightDTO.categoryDTO.color.color.substr(1)));
    }, this));

    insightLineSeries = _.map(insightsMonthly.totalPerCategoryInsightsDTOs, totalPerCategoryInsightDTO => totalPerCategoryInsightDTO.categoryDTO.name);

    return {
      insightsBarData,
      insightsBarSeries: insightLineSeries,
      insightsBarColors,
      insightsBarLabels: ['Categories'],
    };
  };

  this.generateMonthlyDonut = insightsMonthly => {
    let insightsDonutData, insightsDonutLabels, insightsDonutColors;

    insightsDonutData = _.map(insightsMonthly.totalPerCategoryInsightsDTOs, totalPerCategoryInsightDTO => totalPerCategoryInsightDTO.totalAmount);

    insightsDonutColors = _.map(insightsMonthly.totalPerCategoryInsightsDTOs, totalPerCategoryInsightDTO => totalPerCategoryInsightDTO.categoryDTO.color.color);

    insightsDonutLabels = _.map(insightsMonthly.totalPerCategoryInsightsDTOs, totalPerCategoryInsightDTO => totalPerCategoryInsightDTO.categoryDTO.name);

    return {
      insightsDonutData,
      insightsDonutSeries: ['Categories'],
      insightsDonutColors,
      insightsDonutLabels,
    };
  };

  this.generateOverviewBar = function (insightsOverview) {

    let insightsBarLabels, insightsBarData;

    insightsBarData = _.map(insightsOverview.insightsOverview, insightOverviewEntry => insightOverviewEntry.totalAmount);

    insightsBarLabels = _.map(insightsOverview.insightsOverview, insightOverviewEntry => $filter('friendlyMonthDate')(insightOverviewEntry.yearMonth));

    return {
      insightsBarData: [insightsBarData],
      insightsBarSeries: 'Categories',
      insightsBarLabels,
      insightsBarColors: [this.getColour(this.hexToRgb('#dddddd'.substr(1)))],
    };
  };

  this.generateDailyBar = function (year, insightsDaily) {

    let insightsBarLabels, insightsBarData;

    insightsBarData = _.map(insightsDaily.totalPerDayDTOs, totalPerDayDTOEntry => totalPerDayDTOEntry.totalAmount);

    insightsBarLabels = _.map(insightsDaily.totalPerDayDTOs, totalPerDayDTOEntry => {
      const dateFromMonthDay = totalPerDayDTOEntry.monthDay.replace(/--/g, `${year}-`);

      return $filter('friendlyMonthDay')(dateFromMonthDay);
    });

    return {
      insightsBarData: [insightsBarData],
      insightsBarSeries: 'Expenses',
      insightsBarLabels,
      insightsBarColors: [this.getColour(this.hexToRgb('#dddddd'.substr(1)))],
    };
  };

  this.getColour = function (colour) {
    return {
      fillColor: this.rgba(colour, 0.9),
      strokeColor: this.rgba(colour, 1),
      pointColor: this.rgba(colour, 1),
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: this.rgba(colour, 0.1),
    };
  };

  this.hexToRgb = hex => {
    /*jshint validthis: true */
    const bigint = parseInt(hex, 16), r = (bigint >> 16) & 255, g = (bigint >> 8) & 255, b = bigint & 255;

    return [r, g, b];
  };

  this.rgba = (colour, alpha) => `rgba(${colour.concat(alpha).join(',')})`;

}

export default InsightsGenerator;
