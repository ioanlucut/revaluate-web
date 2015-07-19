'use strict';

angular
    .module("revaluate.insights")
    .service("InsightsGenerator", function ($filter) {

        this.generate = function (insightsProgress, masterCategories) {
            // ---
            // First, initialize all category models with yearMonth information.
            // ---
            _.each(insightsProgress.model.insightsMonthlyDTO, function (insightsMonthlyDTOEntry) {
                _.each(masterCategories, function (categoryEntry) {
                    categoryEntry.model.yearMonth = categoryEntry.model.yearMonth || {};
                    categoryEntry.model.yearMonth[insightsMonthlyDTOEntry.yearMonth] = categoryEntry.model.yearMonth[insightsMonthlyDTOEntry.yearMonth] || 0;
                });
            });

            // ---
            // Then just fill the data.
            // ---
            _.each(insightsProgress.model.insightsMonthlyDTO, function (insightsMonthlyDTOEntry) {
                _.each(insightsMonthlyDTOEntry.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightsEntry) {
                    var matchCategory = _.find(masterCategories, function (categoryEntry) {
                        return categoryEntry.model.id === totalPerCategoryInsightsEntry.categoryDTO.id;
                    });

                    matchCategory.model.yearMonth[insightsMonthlyDTOEntry.yearMonth] = totalPerCategoryInsightsEntry.totalAmount;
                });
            });

            var availableYearMonths = _.map(insightsProgress.model.insightsMonthlyDTO, function (insightsMonthlyDTOEntry) {
                return insightsMonthlyDTOEntry.yearMonth;
            });

            // ---
            // Total amount of categories per month.
            // ---
            var totalAmountPerMonths = _.reduce(insightsProgress.model.insightsMonthlyDTO, function (result, insightsMonthlyDTOEntry, key) {
                result[insightsMonthlyDTOEntry.yearMonth] = insightsMonthlyDTOEntry.totalAmountSpent;
                return result;
            }, {});

            // ---
            // Represents the computed line data categorised.
            // ---
            var progressLineData = _.map(masterCategories, function (categoryEntry) {

                var totalCategoryExpensesPerYearMonth = _.map(availableYearMonths, function (availableYearMonthEntry) {
                    return categoryEntry.model.yearMonth[availableYearMonthEntry];
                });

                return {
                    totalCategoryExpensesPerYearMonth: totalCategoryExpensesPerYearMonth,
                    categoryEntry: categoryEntry
                }
            });

            // ---
            // Computed information and methods.
            // ---
            var insightLineData = angular.copy(_.map(progressLineData, 'totalCategoryExpensesPerYearMonth'));
            var insightLabels = angular.copy(_.map(availableYearMonths, function (availableYearMonthsEntry) {

                return $filter('friendlyMonthDateNoYear')(availableYearMonthsEntry);
            }));
            var insightLineSeries = angular.copy(_.map(progressLineData, function (progressLineDataEntry) {
                return progressLineDataEntry.categoryEntry.model.name;
            }));

            return {
                insightLineData: insightLineData,
                insightLabels: insightLabels,
                insightLineSeries: insightLineSeries,
                availableYearMonths: angular.copy(availableYearMonths),
                totalAmountPerMonths: angular.copy(totalAmountPerMonths)
            }
        };

        this.generateMonthlyBar = function (insightsMonthly) {

            var insightsBarData = _.map(insightsMonthly.model.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightDTO) {
                return [totalPerCategoryInsightDTO.totalAmount];
            });
            var insightsBarColors = _.map(insightsMonthly.model.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightDTO) {
                return totalPerCategoryInsightDTO.categoryDTO.color.color;
            });
            var insightLineSeries = _.map(insightsMonthly.model.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightDTO) {
                return totalPerCategoryInsightDTO.categoryDTO.name;
            });

            return {
                insightsBarData: insightsBarData,
                insightsBarSeries: insightLineSeries,
                insightsBarColors: insightsBarColors,
                insightsBarLabels: ["Categories"]
            }
        };

        this.generateMonthlyDonut = function (insightsMonthly) {

            var insightsDonutData = _.map(insightsMonthly.model.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightDTO) {
                return totalPerCategoryInsightDTO.totalAmount;
            });
            var insightsDonutColors = _.map(insightsMonthly.model.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightDTO) {
                return totalPerCategoryInsightDTO.categoryDTO.color.color;
            });
            var insightsDonutLabels = _.map(insightsMonthly.model.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightDTO) {
                return totalPerCategoryInsightDTO.categoryDTO.name;
            });

            return {
                insightsDonutData: insightsDonutData,
                insightsDonutSeries: ["Categories"],
                insightsDonutColors: insightsDonutColors,
                insightsDonutLabels: insightsDonutLabels
            }
        };
    });
