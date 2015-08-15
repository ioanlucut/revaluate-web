(function () {
    'use strict';

    angular
        .module('revaluate.insights')
        .controller('InsightsDailyController', function ($controller, $templateCache, $scope, $rootScope, $filter, $timeout, InsightsGenerator, DatesUtils, ALERTS_EVENTS, INSIGHTS_INTERVAL, insightsDaily, monthsPerYearsStatistics, InsightsService, EXPENSE_EVENTS, USER_ACTIVITY_EVENTS) {

            var TIMEOUT_DURATION = 150,
                vm = this;

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
                $scope: $scope,
                $rootScope: $rootScope,
                $filter: $filter,
                monthsPerYearsStatistics: monthsPerYearsStatistics,
                resizeOnUpdate: true,
                getChartSetSize: function getChartSetSize() {
                    return vm.barInsightsPrepared.insightsBarData[0].length;
                }
            }));

            // ---
            // Customize look.
            // ---
            vm.barOptions = angular.extend(vm.barOptions, {
                scaleShowHorizontalLines: false,
                scaleShowVerticalLines: false,
                scaleShowLabels: false,
                showScale: false,
                scaleFontSize: 12,
                tooltipFontSize: 12,
                tooltipTitleFontSize: 12,
                tooltipYPadding: 15,
                tooltipXPadding: 15
            });

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
            // Computed information and methods.
            // ---
            prepareDataForChart();

            /**
             * Reload chart if necessary upon delete/update/create.
             */
            function reloadIfRequired(expense) {
                var isSameMonth = moment(moment().year()).isSame(moment(expense.model.spentDate).year());

                if (isSameMonth) {
                    vm.loadInsights();
                }
            }

            function tryToReloadIfNecessary(args) {
                if (args.expense) {
                    reloadIfRequired(args.expense);
                } else if (args.expenses) {
                    _.each(args.expenses, function (expenseCandidate) {
                        reloadIfRequired(expenseCandidate);
                    })
                }
            }

            /**
             * Load insights
             */
            vm.loadInsights = function () {
                if (vm.isLoading) {

                    return;
                }

                vm.isLoading = true;

                var period = DatesUtils
                    .fromLastMonthsToNow(1);
                InsightsService
                    .fetchDailyInsightsFromTo(period.from, period.to)
                    .then(function (receivedInsight) {
                        /**
                         * Track event.
                         */
                        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.insightsDailyFetched);

                        $timeout(function () {
                            // ---
                            // Update everything.
                            // ---
                            vm.insightsDaily = receivedInsight;

                            prepareDataForChart();
                            vm.isLoading = false;
                        }, TIMEOUT_DURATION);
                    })
                    .catch(function () {
                        vm.badPostSubmitResponse = true;
                        vm.isLoading = false;

                        $scope.$emit(ALERTS_EVENTS.DANGER, {
                            message: 'Could not fetch insights.'
                        });
                    });
            };

            $scope.$on(EXPENSE_EVENTS.isCreated, function (event, args) {
                tryToReloadIfNecessary(args);
            });
            $scope.$on(EXPENSE_EVENTS.isDeleted, function (event, args) {
                tryToReloadIfNecessary(args);
            });
            $scope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
                tryToReloadIfNecessary(args);
            });

        });
}());
