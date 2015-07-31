'use strict';

angular
    .module("revaluate.insights")
    .controller("InsightsMonthlyController", function ($controller, $scope, DatesUtils, $rootScope, $filter, $timeout, ExpenseService, InsightsGenerator, ALERTS_EVENTS, insightsMonthly, monthsPerYearsStatistics, InsightsService, USER_ACTIVITY_EVENTS, INSIGHTS_CHARTS, ALERTS_CONSTANTS) {

        /* jshint validthis: true */
        var vm = this;

        /**
         * Updating/deleting timeout
         */
        var TIMEOUT_DURATION = 150;

        /**
         * Month constant
         * @type {string}
         */
        var MONTH = 'month';

        /**
         * Alert identifier
         */
        vm.alertId = ALERTS_CONSTANTS.insightsMonthly;

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        vm.user = $rootScope.currentUser;

        /**
         * Fetch all types of insights charts
         */
        vm.INSIGHTS_CHARTS = INSIGHTS_CHARTS;

        /**
         * Default insights loaded.
         */
        vm.insightsMonthly = insightsMonthly;

        /**
         * Insights months per years.
         */
        vm.monthsPerYearsStatistics = monthsPerYearsStatistics;

        // ---
        // Inherit from parent controller.
        // ---
        angular.extend(this, $controller('InsightsAbstractController', {
            $scope: $scope,
            $timeout: $timeout,
            $rootScope: $rootScope,
            $filter: $filter,
            monthsPerYearsStatistics: monthsPerYearsStatistics,
            resizeOnUpdate: true,
            getChartSetSize: function getChartSetSize() {
                return vm.barInsightsPrepared.insightsBarData.length;
            }
        }));

        /**
         * Prepares data for chart
         */
        function prepareDataForChart() {
            // ---
            // Computed information and methods.
            // ---
            vm.barInsightsPrepared = InsightsGenerator
                .generateMonthlyBar(vm.insightsMonthly);

            vm.donutInsightsPrepared = InsightsGenerator
                .generateMonthlyDonut(vm.insightsMonthly);

            $scope.$emit("chartsLoaded", { size: vm.barInsightsPrepared.insightsBarData.length });
        }

        // ---
        // Computed information and methods.
        // ---
        prepareDataForChart();

        /**
         * Default active chart
         */
        vm.activeChart = vm.INSIGHTS_CHARTS.DOUGHNUT;

        /**
         * Sets te active chart displayed with the given chart type.
         */
        vm.setActiveChart = function (chartType) {
            vm.activeChart = chartType;
        };

        /**
         * Checks if the date should be disabled.
         */
        vm.shouldDateBeDisabled = function (date) {
            var givenDate = moment(date);
            var givenDateYear = givenDate.year();
            var givenDateMonth = givenDate.month() + 1;

            if ( !_.has(vm.monthsPerYearsStatistics.model.insightsMonthsPerYears, givenDateYear) ) {

                return true;
            }

            return !_.some(_.result(vm.monthsPerYearsStatistics.model.insightsMonthsPerYears, givenDateYear), function (entry) {
                return entry === givenDateMonth;
            });
        };

        /**
         * Open date picker
         */
        vm.openDatePicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.datePickerOpened = true;
        };

        /**
         * Exposed insights data (first define master copy).
         */
        vm.masterInsightData = {
            yearMonthDate: moment().toDate()
        };

        /**
         * Exposed insights data.
         */
        vm.insightData = angular.copy(vm.masterInsightData);

        /**
         * Load insights
         */
        function loadInsight() {
            if ( vm.isLoading ) {

                vm.insightData = angular.copy(vm.masterInsightData);
                return;
            }

            vm.isLoading = true;
            var period = DatesUtils
                .getFromToOfMonthYear(angular.copy(vm.insightData));

            InsightsService
                .fetchMonthlyInsightsFromTo(period.from, period.to)
                .then(function (receivedInsight) {

                    /**
                     * Track event.
                     */
                    $scope.$emit("trackEvent", USER_ACTIVITY_EVENTS.insightsFetched);

                    $timeout(function () {
                        if ( receivedInsight.isEmpty() ) {
                            // ---
                            // Reset the insights data.
                            // ---
                            vm.insightData = angular.copy(vm.masterInsightData);
                            $scope.$emit(ALERTS_EVENTS.INFO, "There are no expenses defined for selected period.");
                        }
                        else {
                            // ---
                            // If there was a previously error, just clear it.
                            // ---
                            $scope.$emit(ALERTS_EVENTS.CLEAR, {
                                alertId: vm.alertId
                            });

                            // ---
                            // Update everything.
                            // ---
                            vm.masterInsightData = angular.copy(vm.insightData);
                            vm.insightsMonthly = receivedInsight;

                            prepareDataForChart();
                        }

                        vm.isLoading = false;

                    }, TIMEOUT_DURATION);
                })
                .catch(function () {
                    vm.badPostSubmitResponse = true;
                    vm.isLoading = false;

                    // ---
                    // Reset the insights data.
                    // ---
                    vm.insightData = angular.copy(vm.masterInsightData);
                    $scope.$emit(ALERTS_EVENTS.DANGER, {
                        message: "Could not fetch insights.",
                        alertId: vm.alertId
                    });
                });
        }

        /**
         * On date change do load insights
         */
        vm.onChange = function () {
            loadInsight();
        };

        /**
         * Only if -1 month is at most the first existing expenses date.
         * @returns {boolean}
         */
        vm.canLoadPrevMonth = function () {
            var currentSelectedDate = moment(vm.insightData.monthYearDate);
            var currentSelectedDateYear = currentSelectedDate.year();
            var currentSelectedDateMonth = currentSelectedDate.month() + 1;

            if ( !expensesExistsInYear(currentSelectedDateYear) ) {

                return true;
            }

            // ---
            // We check in the previous month.
            // ---
            return expensesExistsInMonthWithYear(currentSelectedDateYear, currentSelectedDateMonth - 1);
        };

        /**
         * Go to previous month
         */
        vm.prevMonth = function () {
            vm.insightData.monthYearDate = moment(vm.insightData.monthYearDate).subtract(1, MONTH).toDate();

            loadInsight();
        };

        /**
         * Only if +1 month is at most the last existing expenses date.
         */
        vm.canLoadNextMonth = function () {
            var currentSelectedDate = moment(vm.insightData.monthYearDate);
            var currentSelectedDateYear = currentSelectedDate.year();
            var currentSelectedDateMonth = currentSelectedDate.month() + 1;

            if ( !expensesExistsInYear(currentSelectedDateYear) ) {

                return true;
            }

            // ---
            // We check in the previous month.
            // ---
            return expensesExistsInMonthWithYear(currentSelectedDateYear, currentSelectedDateMonth + 1);
        };

        /**
         * Go to next month
         */
        vm.nextMonth = function () {
            vm.insightData.monthYearDate = moment(vm.insightData.monthYearDate).add(1, MONTH).toDate();

            loadInsight();
        };

        /**
         * Checks if in the given year are expenses defined.
         */
        function expensesExistsInYear(dateYear) {
            return _.has(vm.monthsPerYearsStatistics.model.insightsMonthsPerYears, dateYear);
        }

        /**
         * Checks if in the given year and month are expenses defined.
         */
        function expensesExistsInMonthWithYear(givenDateYear, givenDateMonth) {
            return _.some(_.result(vm.monthsPerYearsStatistics.model.insightsMonthsPerYears, givenDateYear), function (entry) {
                return entry === givenDateMonth;
            });
        }
    });
