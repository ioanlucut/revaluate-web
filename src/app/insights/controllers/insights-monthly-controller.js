(function () {
    'use strict';

    function InsightsMonthlyController(USER_ACTIVITY_EVENTS, INSIGHTS_CHARTS, ALERTS_CONSTANTS, ALERTS_EVENTS, $controller, $scope, promiseTracker, DatesUtils, $rootScope, $filter, $timeout, InsightsGenerator, InsightsService, insightsMonthly, monthsPerYearsStatistics) {

        var vm = this,
            MONTH = 'month';

        /**
         * Alert identifier
         */
        vm.alertId = ALERTS_CONSTANTS.insightsMonthly;

        /**
         * Current user.
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

        // ---
        // Computed information and methods.
        // ---
        prepareDataForChart();

        /**
         * Default active chart
         */
        vm.activeChart = vm.INSIGHTS_CHARTS.BAR;

        /**
         * Sets te active chart displayed with the given chart type.
         */
        vm.setActiveChart = function (chartType) {
            vm.activeChart = chartType;
        };

        /**
         * Checks if the date should be disabled.
         */
        vm.shouldDateBeDisabled = shouldDateBeDisabled;

        /**
         * Open date picker
         */
        vm.openDatePicker = openDatePicker;

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
         * On date change do load insights
         */
        vm.onChange = function () {
            loadInsight();
        };

        /**
         * Only if -1 month is at most the first existing expenses date.
         */
        vm.canLoadPrevMonth = canLoadPrevMonth;

        /**
         * Only if +1 month is at most the last existing expenses date.
         */
        vm.canLoadNextMonth = canLoadNextMonth;

        /**
         * Go to previous month
         */
        vm.prevMonth = function () {
            vm.insightData.yearMonthDate = moment(vm.insightData.yearMonthDate).subtract(1, MONTH).toDate();

            loadInsight();
        };

        /**
         * Go to next month
         */
        vm.nextMonth = function () {
            vm.insightData.yearMonthDate = moment(vm.insightData.yearMonthDate).add(1, MONTH).toDate();

            loadInsight();
        };

        /**
         * Create a saving tracker.
         */
        vm.loadTracker = promiseTracker();

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

            $scope.$emit('chartsLoaded', { size: vm.barInsightsPrepared.insightsBarData.length });
        }

        function shouldDateBeDisabled(date) {
            var givenDate = moment(date),
                givenDateYear = givenDate.year(),
                givenDateMonth = givenDate.month() + 1;

            if (!_.has(vm.monthsPerYearsStatistics.model.insightsMonthsPerYears, givenDateYear)) {

                return true;
            }

            return !_.some(_.result(vm.monthsPerYearsStatistics.model.insightsMonthsPerYears, givenDateYear), function (entry) {
                return entry === givenDateMonth;
            });
        }

        function openDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.datePickerOpened = true;
        }

        function canLoadPrevMonth() {
            var currentSelectedDate = moment(vm.insightData.yearMonthDate),
                currentSelectedDateYear = currentSelectedDate.year(),
                currentSelectedDateMonth = currentSelectedDate.month() + 1;

            if (!expensesExistsInYear(currentSelectedDateYear)) {

                return true;
            }

            // ---
            // We check in the previous month.
            // ---
            return expensesExistsInMonthWithYear(currentSelectedDateYear, currentSelectedDateMonth - 1);
        }

        function canLoadNextMonth() {
            var currentSelectedDate = moment(vm.insightData.yearMonthDate),
                currentSelectedDateYear = currentSelectedDate.year(),
                currentSelectedDateMonth = currentSelectedDate.month() + 1;

            if (!expensesExistsInYear(currentSelectedDateYear)) {

                return true;
            }

            // ---
            // We check in the previous month.
            // ---
            return expensesExistsInMonthWithYear(currentSelectedDateYear, currentSelectedDateMonth + 1);
        }

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

        /**
         * Load insights
         */
        function loadInsight() {
            if (vm.loadTracker.active()) {

                vm.insightData = angular.copy(vm.masterInsightData);
                return;
            }

            var computedInsightsData = angular.copy(vm.insightData),
                period = DatesUtils
                    .getFromToOfMonthYear(computedInsightsData.yearMonthDate);

            InsightsService
                .fetchMonthlyInsightsFromTo(period.from, period.to, vm.loadTracker)
                .then(function (receivedInsight) {
                    // ---
                    // Update everything.
                    // ---
                    vm.masterInsightData = angular.copy(vm.insightData);
                    vm.insightsMonthly = receivedInsight;
                    prepareDataForChart();

                    // ---
                    // If there was a previously error, just clear it.
                    // ---
                    $scope.$emit(ALERTS_EVENTS.CLEAR, {
                        alertId: vm.alertId
                    });
                    $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.insightsFetched);
                })
                .catch(function () {
                    vm.badPostSubmitResponse = true;
                    // ---
                    // Reset the insights data.
                    // ---
                    vm.insightData = angular.copy(vm.masterInsightData);
                    $scope.$emit(ALERTS_EVENTS.DANGER, {
                        message: 'Could not fetch insights.',
                        alertId: vm.alertId
                    });
                });
        }

    };
    angular
        .module('revaluate.insights')
        .controller('InsightsMonthlyController', InsightsMonthlyController);
}());
