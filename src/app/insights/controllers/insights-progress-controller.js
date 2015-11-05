(function () {
    'use strict';

    angular
        .module('revaluate.insights')
        .controller('InsightsProgressController', function (DatesUtils, $controller, $templateCache, $scope, $rootScope, $filter, $timeout, InsightsGenerator, ALERTS_EVENTS, INSIGHTS_INTERVAL, insightsProgress, monthsPerYearsStatistics, categories, InsightsService, USER_ACTIVITY_EVENTS, INSIGHTS_CHARTS, ALERTS_CONSTANTS) {

            var TIMEOUT_DURATION = 150,
                vm = this;

            /**
             * Alert identifier
             */
            vm.alertId = ALERTS_CONSTANTS.insights;

            /**
             * Insights interval
             */
            vm.INSIGHTS_INTERVAL = INSIGHTS_INTERVAL;

            /**
             * Existing categories.
             */
            vm.categories = categories;

            /**
             * Just make a copy of master categories
             */
            vm.masterCategories = angular.copy(vm.categories);

            /**
             * Default insights progress.
             */
            vm.insightsProgress = insightsProgress;

            /**
             * Default active interval selected.
             * @type {number}
             */
            vm.activeInterval = vm.INSIGHTS_INTERVAL.HALF_YEAR;

            // ---
            // Inherit from parent controller.
            // ---
            angular.extend(this, $controller('InsightsAbstractController', {
                $scope: $scope,
                $rootScope: $rootScope,
                $filter: $filter,
                monthsPerYearsStatistics: monthsPerYearsStatistics,
                resizeOnUpdate: false,
                getChartSetSize: function () {
                }
            }));

            // ---
            // Update the options.
            // ---
            vm.lineOptions = _.extend(vm.barOptions, {
                datasetFill: false, animation: false, animationSteps: 30
            });

            /**
             * Toggle category selection
             */
            vm.toggleAndReloadInsights = function (category) {
                category.selected = !category.selected;

                prepareDataForProgressChart();
            };

            /**
             * Prepares data for progress chart
             */
            function prepareDataForProgressChart() {
                if ( vm.isMinimumNumberOfAllowedUnselectedCategoriesExceeded() ) {
                    return;
                }

                var insightsPrepared = InsightsGenerator
                    .generate(vm.insightsProgress, getSelectedCategories());

                vm.insightLineData = insightsPrepared.insightLineData;
                vm.insightLabels = insightsPrepared.insightLabels;
                vm.insightLineSeries = insightsPrepared.insightLineSeries;
                vm.insightLineColors = insightsPrepared.insightLineColors;

                vm.availableYearMonths = insightsPrepared.availableYearMonths;
                vm.totalAmountPerMonths = insightsPrepared.totalAmountPerMonths;
            }

            function getSelectedCategories() {
                return _.filter(vm.masterCategories, 'selected', true);
            }

            function reloadAllCategoriesWithSelectedAs(status) {
                _.each(vm.masterCategories, function (category) {
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
            vm.isMinimumNumberOfAllowedUnselectedCategoriesExceeded = function () {
                return getSelectedCategories().length === 0;
            };

            vm.selectAll = function () {
                if ( getSelectedCategories().length < vm.masterCategories.length ) {

                    reloadAllCategoriesWithSelectedAs(true);
                }
            };

            vm.clearAll = function () {
                if ( getSelectedCategories().length > 0 ) {

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
            vm.loadInsights = function (insightsIntervalMonths) {
                if ( vm.isLoading ) {

                    return;
                }

                vm.isLoading = true;
                var period = DatesUtils
                    .fromLastMonthsToNow(insightsIntervalMonths);

                InsightsService
                    .fetchProgressInsightsFromTo(period.from, period.to)
                    .then(function (receivedInsight) {
                        vm.activeInterval = insightsIntervalMonths;

                        /**
                         * Track event.
                         */
                        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.insightsProgressFetched);

                        $timeout(function () {
                            // ---
                            // Update everything.
                            // ---
                            vm.insightsProgress = receivedInsight;

                            // ---
                            // Computed information and methods.
                            // ---
                            prepareDataForProgressChart();

                            vm.isLoading = false;
                        }, TIMEOUT_DURATION);
                    })
                    .catch(function () {
                        vm.badPostSubmitResponse = true;
                        vm.isLoading = false;

                        $scope.$emit(ALERTS_EVENTS.DANGER, {
                            message: 'Could not fetch insights.',
                            alertId: vm.alertId
                        });
                    });
            };

        });
}());
