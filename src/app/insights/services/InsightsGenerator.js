(function () {
    'use strict';

    angular
        .module('revaluate.insights')
        .service('InsightsGenerator', function ($filter) {

            this.generate = function (insightsProgress, masterCategories) {
                var availableYearMonths,
                    totalAmountPerMonths,
                    progressLineData,
                    insightLineColors,
                    insightLineSeries,
                    insightLabels,
                    insightLineData;

                // ---
                // First, initialize all category models with yearMonth information.
                // ---
                _.each(insightsProgress.insightsMonthlyDTO, function (insightsMonthlyDTOEntry) {
                    _.each(masterCategories, function (categoryEntry) {
                        categoryEntry.yearMonth = categoryEntry.yearMonth || {};
                        categoryEntry.yearMonth[insightsMonthlyDTOEntry.yearMonth] = categoryEntry.yearMonth[insightsMonthlyDTOEntry.yearMonth] || 0;
                    });
                });

                // ---
                // Then just fill the data.
                // ---
                _.each(insightsProgress.insightsMonthlyDTO, function (insightsMonthlyDTOEntry) {
                    _.each(insightsMonthlyDTOEntry.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightsEntry) {
                        var matchCategory = _.find(masterCategories, function (categoryEntry) {
                            return categoryEntry.id === totalPerCategoryInsightsEntry.categoryDTO.id;
                        });

                        if (matchCategory) {
                            matchCategory.yearMonth[insightsMonthlyDTOEntry.yearMonth] = totalPerCategoryInsightsEntry.totalAmount;
                        }
                    });
                });

                availableYearMonths = _.map(insightsProgress.insightsMonthlyDTO, function (insightsMonthlyDTOEntry) {
                    return insightsMonthlyDTOEntry.yearMonth;
                });

                // ---
                // Total amount of categories per month.
                // ---
                totalAmountPerMonths = _.reduce(insightsProgress.insightsMonthlyDTO, function (result, insightsMonthlyDTOEntry) {
                    result[insightsMonthlyDTOEntry.yearMonth] = insightsMonthlyDTOEntry.totalAmountSpent;
                    return result;
                }, {});

                // ---
                // Represents the computed line data categorised.
                // ---
                progressLineData = _.map(masterCategories, function (categoryEntry) {

                    var totalCategoryExpensesPerYearMonth = _.map(availableYearMonths, function (availableYearMonthEntry) {
                        return categoryEntry.yearMonth[availableYearMonthEntry];
                    });

                    return {
                        totalCategoryExpensesPerYearMonth: totalCategoryExpensesPerYearMonth,
                        categoryEntry: categoryEntry
                    };
                });

                // ---
                // Computed information and methods.
                // ---
                insightLineData = angular.copy(_.map(progressLineData, 'totalCategoryExpensesPerYearMonth'));
                insightLabels = angular.copy(_.map(availableYearMonths, function (availableYearMonthsEntry) {

                    return $filter('friendlyMonthShortDateNoYear')(availableYearMonthsEntry);
                }));

                insightLineSeries = angular.copy(_.map(progressLineData, function (progressLineDataEntry) {
                    return progressLineDataEntry.categoryEntry.name;
                }));

                insightLineColors = angular.copy(_.map(progressLineData, function (progressLineDataEntry) {
                    return progressLineDataEntry.categoryEntry.color.color;
                }));

                return {
                    insightLineData: insightLineData,
                    insightLineColors: insightLineColors,
                    insightLabels: insightLabels,
                    insightLineSeries: insightLineSeries,
                    availableYearMonths: angular.copy(availableYearMonths),
                    totalAmountPerMonths: angular.copy(totalAmountPerMonths)
                };
            };

            this.generateMonthlyBar = function (insightsMonthly) {
                var insightsBarData, insightsBarColors, insightLineSeries;

                insightsBarData = _.map(insightsMonthly.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightDTO) {
                    return [totalPerCategoryInsightDTO.totalAmount];
                });

                insightsBarColors = _.map(insightsMonthly.totalPerCategoryInsightsDTOs, _.bind(function (totalPerCategoryInsightDTO) {
                    return this.getColour(this.hexToRgb(totalPerCategoryInsightDTO.categoryDTO.color.color.substr(1)));
                }, this));

                insightLineSeries = _.map(insightsMonthly.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightDTO) {
                    return totalPerCategoryInsightDTO.categoryDTO.name;
                });

                return {
                    insightsBarData: insightsBarData,
                    insightsBarSeries: insightLineSeries,
                    insightsBarColors: insightsBarColors,
                    insightsBarLabels: ['Categories']
                };
            };

            this.generateMonthlyDonut = function (insightsMonthly) {
                var insightsDonutData, insightsDonutLabels, insightsDonutColors;

                insightsDonutData = _.map(insightsMonthly.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightDTO) {
                    return totalPerCategoryInsightDTO.totalAmount;
                });

                insightsDonutColors = _.map(insightsMonthly.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightDTO) {
                    return totalPerCategoryInsightDTO.categoryDTO.color.color;
                });

                insightsDonutLabels = _.map(insightsMonthly.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightDTO) {
                    return totalPerCategoryInsightDTO.categoryDTO.name;
                });

                return {
                    insightsDonutData: insightsDonutData,
                    insightsDonutSeries: ['Categories'],
                    insightsDonutColors: insightsDonutColors,
                    insightsDonutLabels: insightsDonutLabels
                };
            };

            this.generateOverviewBar = function (insightsOverview) {

                var insightsBarLabels,
                    insightsBarData;

                insightsBarData = _.map(insightsOverview.insightsOverview, function (insightOverviewEntry) {
                    return insightOverviewEntry.totalAmount;
                });

                insightsBarLabels = _.map(insightsOverview.insightsOverview, function (insightOverviewEntry) {
                    return $filter('friendlyMonthDate')(insightOverviewEntry.yearMonth);
                });

                return {
                    insightsBarData: [insightsBarData],
                    insightsBarSeries: 'Categories',
                    insightsBarLabels: insightsBarLabels,
                    insightsBarColors: [this.getColour(this.hexToRgb('#dddddd'.substr(1)))]
                };
            };

            this.generateDailyBar = function (year, insightsDaily) {

                var insightsBarLabels,
                    insightsBarData;

                insightsBarData = _.map(insightsDaily.totalPerDayDTOs, function (totalPerDayDTOEntry) {
                    return totalPerDayDTOEntry.totalAmount;
                });

                insightsBarLabels = _.map(insightsDaily.totalPerDayDTOs, function (totalPerDayDTOEntry) {
                    var dateFromMonthDay = totalPerDayDTOEntry.monthDay.replace(/--/g, year + '-');

                    return $filter('friendlyMonthDay')(dateFromMonthDay);
                });

                return {
                    insightsBarData: [insightsBarData],
                    insightsBarSeries: 'Expenses',
                    insightsBarLabels: insightsBarLabels,
                    insightsBarColors: [this.getColour(this.hexToRgb('#dddddd'.substr(1)))]
                };
            };

            this.getColour = function (colour) {
                return {
                    fillColor: this.rgba(colour, 0.9),
                    strokeColor: this.rgba(colour, 1),
                    pointColor: this.rgba(colour, 1),
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: this.rgba(colour, 0.1)
                };
            };

            this.hexToRgb = function (hex) {
                /*jshint validthis: true */
                var bigint = parseInt(hex, 16),
                    r = (bigint >> 16) & 255,
                    g = (bigint >> 8) & 255,
                    b = bigint & 255;

                return [r, g, b];
            };

            this.rgba = function (colour, alpha) {
                return 'rgba(' + colour.concat(alpha).join(',') + ')';
            };

        });
}());
