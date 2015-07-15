'use strict';

angular
    .module("revaluate.insights")
    .controller("InsightController", function ($templateCache, $scope, $rootScope, $filter, $timeout, ALERTS_EVENTS, insight, insightsMonthsPerYearsStatistics, InsightService, USER_ACTIVITY_EVENTS, INSIGHTS_CHARTS, ALERTS_CONSTANTS) {

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
        vm.alertId = ALERTS_CONSTANTS.insights;

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        vm.user = $rootScope.currentUser;

        /**
         * Default insights loaded.
         */
        vm.insight = insight;

        /**
         * Insights months per years.
         */
        vm.insightsMonthsPerYearsStatistics = insightsMonthsPerYearsStatistics;

        /**
         * Fetch all types of insight charts
         */
        vm.INSIGHTS_CHARTS = INSIGHTS_CHARTS;

        // ---
        // Computed information and methods.
        // ---
        vm.insightLineData = [insight.model.insightData];
        vm.insightLineColors = [insight.model.insightColors];
        vm.insightLineSeries = ["Categories"];
        vm.activeChart = vm.INSIGHTS_CHARTS.DOUGHNUT;

        /**
         * Sets te active chart displayed with the given chart type.
         * @param chartType
         */
        vm.setActiveChart = function (chartType) {
            vm.activeChart = chartType;
        };

        /**
         * Checks if the date should be disabled.
         */
        vm.shouldDateBeDisabled = function (date, mode) {
            var givenDate = moment(date);
            var givenDateYear = givenDate.year();
            var givenDateMonth = givenDate.month() + 1;

            if ( !_.has(vm.insightsMonthsPerYearsStatistics.insightsMonthsPerYears, givenDateYear) ) {

                return true;
            }

            return !_.some(_.result(vm.insightsMonthsPerYearsStatistics.insightsMonthsPerYears, givenDateYear), function (entry) {
                return entry === givenDateMonth;
            });
        };

        // ---
        // Chart config options.
        // ---
        var defaultChartOptions = {
            scaleLabel: function (label) {

                return formatChartValue(label);
            },
            multiTooltipTemplate: function (label) {

                return label.datasetLabel + ' ' + formatChartValue(label);
            },
            tooltipTemplate: function (label) {

                return label.label + ' ' + formatChartValue(label);
            }
        };

        /**
         * Formats chart value
         */
        function formatChartValue(price) {

            return $filter('currency')(price.value.toString(), '', vm.user.model.currency.fractionSize) + ' ' + vm.user.model.currency.symbol
        }

        // ---
        // Specific bar chart options.
        // ---
        vm.barOptions = angular.extend({}, defaultChartOptions);

        // ---
        // Specific donut chart options.
        // ---
        vm
            .donutChartOptions = angular.extend({}, defaultChartOptions);
        vm
            .donutChartOptions
            .legendTemplate = "<ul class=\"doughnut__chart__legend\"><% for (var i=0; i<segments.length; i++){%><li class=\"doughnut__chart__legend__box\"><span class=\"doughnut__chart__legend__box__color\" style=\"background-color:<%=segments[i].fillColor%>\"></span><span class=\"doughnut__chart__legend__box__label\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>";

        /**
         * Open date picker
         */
        vm.openDatePicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.datePickerOpened = true;
        };

        /**
         * Exposed insight data (first define master copy).
         */
        vm.masterInsightData = {
            spentDate: moment().toDate()
        };

        /**
         * Exposed insight data.
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
            var computedInsightsData = angular.copy(vm.insightData);
            var from = moment(computedInsightsData.spentDate).startOf(MONTH);
            var to = moment(computedInsightsData.spentDate).endOf(MONTH);
            InsightService
                .fetchInsightsFromTo(from, to)
                .then(function (receivedInsight) {

                    /**
                     * Track event.
                     */
                    $scope.$emit("trackEvent", USER_ACTIVITY_EVENTS.insightsFetched);

                    $timeout(function () {
                        if ( receivedInsight.isEmpty() ) {
                            // ---
                            // Reset the insight data.
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
                            vm.insight = receivedInsight;
                            vm.insightLineData = [vm.insight.model.insightData];
                            vm.insightLineSeries = ["Categories"];
                        }

                        vm.isLoading = false;

                    }, TIMEOUT_DURATION);
                })
                .catch(function () {
                    vm.badPostSubmitResponse = true;
                    vm.isLoading = false;

                    // ---
                    // Reset the insight data.
                    // ---
                    vm.insightData = angular.copy(vm.masterInsightData);
                    $scope.$emit(ALERTS_EVENTS.DANGER, {
                        message: "Could not fetch insights.",
                        alertId: vm.alertId
                    });
                });
        }

        /**
         * On date change do load insight
         */
        vm.onChange = function () {
            loadInsight();
        };

        /**
         * Only if -1 month is at most the first existing expenses date.
         * @returns {boolean}
         */
        vm.canLoadPrevMonth = function () {
            var currentSelectedDate = moment(vm.insightData.spentDate);
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
            vm.insightData.spentDate = moment(vm.insightData.spentDate).subtract(1, MONTH).toDate();

            loadInsight();
        };

        /**
         * Only if +1 month is at most the last existing expenses date.
         */
        vm.canLoadNextMonth = function () {
            var currentSelectedDate = moment(vm.insightData.spentDate);
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
            vm.insightData.spentDate = moment(vm.insightData.spentDate).add(1, MONTH).toDate();

            loadInsight();
        };

        /**
         * Checks if in the given year are expenses defined.
         */
        function expensesExistsInYear(dateYear) {
            return _.has(vm.insightsMonthsPerYearsStatistics.insightsMonthsPerYears, dateYear);
        }

        /**
         * Checks if in the given year and month are expenses defined.
         */
        function expensesExistsInMonthWithYear(givenDateYear, givenDateMonth) {
            return _.some(_.result(vm.insightsMonthsPerYearsStatistics.insightsMonthsPerYears, givenDateYear), function (entry) {
                return entry === givenDateMonth;
            });
        }
    });
