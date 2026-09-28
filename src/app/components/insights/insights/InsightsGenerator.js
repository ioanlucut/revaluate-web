function InsightsGenerator($filter, ColorsUtils) {
  'ngInject';

  this.generate = ({ insightsMonthlyDTO }, masterCategories) => {
    // ---
    // First, initialize all category models with yearMonth information.
    // ---
    _.each(insightsMonthlyDTO, insightsMonthlyDTOEntry => {
      _.each(masterCategories, categoryEntry => {
        categoryEntry.yearMonth = categoryEntry.yearMonth || {};
        categoryEntry.yearMonth[insightsMonthlyDTOEntry.yearMonth] =
          categoryEntry.yearMonth[insightsMonthlyDTOEntry.yearMonth] || 0;
      });
    });

    // ---
    // Then just fill the data.
    // ---
    _.each(insightsMonthlyDTO, insightsMonthlyDTOEntry => {
      _.each(
        insightsMonthlyDTOEntry.totalPerCategoryInsightsDTOs,
        totalPerCategoryInsightsEntry => {
          const matchCategory = _.find(masterCategories, categoryEntry =>
          categoryEntry.id === totalPerCategoryInsightsEntry.categoryDTO.id);

          if (matchCategory) {
            matchCategory.yearMonth[insightsMonthlyDTOEntry.yearMonth] =
              totalPerCategoryInsightsEntry.totalAmount;
          }
        }
      );
    });

    const availableYearMonths = _.map(insightsMonthlyDTO, insightsMonthlyDTOEntry =>
      insightsMonthlyDTOEntry.yearMonth);

    // ---
    // Total amount of categories per month.
    // ---
    const totalAmountPerMonths =
      _.reduce(insightsMonthlyDTO, (result, insightsMonthlyDTOEntry) => {
        result[insightsMonthlyDTOEntry.yearMonth] = insightsMonthlyDTOEntry.totalAmountSpent;
        return result;
      }, {});

    // ---
    // Represents the computed line data categorised.
    // ---
    const progressLineData = _.map(masterCategories, categoryEntry => {
      const totalCategoryExpensesPerYearMonth =
        _.map(availableYearMonths, availableYearMonthEntry =>
          categoryEntry.yearMonth[availableYearMonthEntry]);

      return {
        totalCategoryExpensesPerYearMonth,
        categoryEntry,
      };
    });

    // ---
    // Computed information and methods.
    // ---
    const insightLineData = angular.copy(
      _.map(progressLineData, 'totalCategoryExpensesPerYearMonth'));
    const insightLabels = angular.copy(_.map(availableYearMonths, availableYearMonthsEntry =>
      $filter('friendlyMonthShortDateNoYear')(availableYearMonthsEntry)));
    const insightLineSeries = angular.copy(_.map(progressLineData, progressLineDataEntry =>
      progressLineDataEntry.categoryEntry.name));
    const insightLineColors = angular.copy(_.map(progressLineData, progressLineDataEntry =>
      progressLineDataEntry.categoryEntry.color.color));

    return {
      insightLineData,
      insightLineColors,
      insightLabels,
      insightLineSeries,
      availableYearMonths: angular.copy(availableYearMonths),
      totalAmountPerMonths: angular.copy(totalAmountPerMonths),
    };
  };

  this.generateMonthlyBar = ({ totalPerCategoryInsightsDTOs }) => {
    const insightsBarData = _.map(totalPerCategoryInsightsDTOs, totalPerCategoryInsightDTO =>
      [totalPerCategoryInsightDTO.totalAmount]);
    const insightsBarColors = _.map(totalPerCategoryInsightsDTOs, ({ categoryDTO: { color } }) =>
      ColorsUtils.getColour(ColorsUtils.hexToRgb(color.color.substr(1))));
    const insightLineSeries = _.map(totalPerCategoryInsightsDTOs, totalPerCategoryInsightDTO =>
      totalPerCategoryInsightDTO.categoryDTO.name);

    return {
      insightsBarData,
      insightsBarSeries: insightLineSeries,
      insightsBarColors,
      insightsBarLabels: ['Categories'],
    };
  };

  this.generateMonthlyDonut = ({ totalPerCategoryInsightsDTOs }) => {
    const insightsDonutData = _.map(totalPerCategoryInsightsDTOs, totalPerCategoryInsightDTO =>
      totalPerCategoryInsightDTO.totalAmount);
    const insightsDonutColors = _.map(totalPerCategoryInsightsDTOs, totalPerCategoryInsightDTO =>
      totalPerCategoryInsightDTO.categoryDTO.color.color);
    const insightsDonutLabels = _.map(totalPerCategoryInsightsDTOs, totalPerCategoryInsightDTO =>
      totalPerCategoryInsightDTO.categoryDTO.name);

    return {
      insightsDonutData,
      insightsDonutSeries: ['Categories'],
      insightsDonutColors,
      insightsDonutLabels,
    };
  };

  this.generateOverviewBar = ({ insightsOverview }) => {
    const insightsBarData = _.map(insightsOverview, insightOverviewEntry =>
      insightOverviewEntry.totalAmount);
    const insightsBarLabels = _.map(insightsOverview, insightOverviewEntry =>
      $filter('friendlyMonthDate')(insightOverviewEntry.yearMonth));

    return {
      insightsBarData: [insightsBarData],
      insightsBarSeries: 'Categories',
      insightsBarLabels,
      insightsBarColors: [ColorsUtils.getColour(ColorsUtils.hexToRgb('#dddddd'.substr(1)))],
    };
  };

  this.generateDailyBar = (year, { totalPerDayDTOs }) => {
    const insightsBarData = _.map(totalPerDayDTOs, totalPerDayDTOEntry =>
      totalPerDayDTOEntry.totalAmount);
    const insightsBarLabels = _.map(totalPerDayDTOs, totalPerDayDTOEntry => {
      const dateFromMonthDay = totalPerDayDTOEntry.monthDay.replace(/--/g, `${year}-`);

      return $filter('friendlyMonthDay')(dateFromMonthDay);
    });

    return {
      insightsBarData: [insightsBarData],
      insightsBarSeries: 'Expenses',
      insightsBarLabels,
      insightsBarColors: [ColorsUtils.getColour(ColorsUtils.hexToRgb('#dddddd'.substr(1)))],
    };
  };
}

export default InsightsGenerator;
