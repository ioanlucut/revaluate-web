'use strict';

/**
 * expenses controller.
 */
angular
    .module("revaluate.insights")
    .controller("InsightController", function ($templateCache, $scope, $rootScope, $filter, $timeout, flash, insight, statistics, insightsMonthsPerYears, InsightService, MIXPANEL_EVENTS, INSIGHTS_CHARTS, ALERTS_CONSTANTS) {

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
        $scope.alertIdentifierId = ALERTS_CONSTANTS.insights;

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Default insights loaded.
         */
        $scope.insight = insight;

        $scope.insightLineData = [insight.model.insightData];
        $scope.insightLineColors = [insight.model.insightColors];
        $scope.insightLineSeries = ["Categories"];

        $scope.INSIGHTS_CHARTS = INSIGHTS_CHARTS;
        $scope.activeChart = $scope.INSIGHTS_CHARTS.DOUGHNUT;

        $scope.setActiveChart = function (chartType) {
            $scope.activeChart = chartType;
        };

        /**
         * Expenses statistics
         * @type {statistics|*}
         */
        $scope.statistics = statistics;

        /**
         * Insights months per years.
         */
        $scope.insightsMonthsPerYears = insightsMonthsPerYears;

        /**
         * Checks if the date should be disabled.
         */
        $scope.shouldDateBeDisabled = function (date, mode) {
            var givenDate = moment(date);
            var givenDateYear = givenDate.year();
            var givenDateMonth = givenDate.month() + 1;

            var givenYearIsDefined = _.has($scope.insightsMonthsPerYears.insightsMonthsPerYears, givenDateYear);
            if ( !givenYearIsDefined ) {

                return true;
            }

            var givenMonthHasAMatch = _.some(_.result($scope.insightsMonthsPerYears.insightsMonthsPerYears, givenDateYear), function (entry) {
                return entry === givenDateMonth;
            });

            return !givenMonthHasAMatch;
        };

        // ---
        // Chart config options.
        // ---
        $scope.defaultChartOptions = {
            scaleLabel: function (label) {

                return formatValue(label);
            },
            multiTooltipTemplate: function (label) {

                return label.datasetLabel + ' ' + formatValue(label);
            },
            tooltipTemplate: function (label) {

                return label.label + ' ' + formatValue(label);
            }
        };

        function formatValue(label) {

            return $filter('currency')(label.value.toString(), '', $scope.user.model.currency.fractionSize) + ' ' + $scope.user.model.currency.symbol
        }

        // ---
        // Specific bar chart options.
        // ---
        $scope.barOptions = angular.extend({}, $scope.defaultChartOptions);

        // ---
        // Specific donut chart options.
        // ---
        $scope
            .donutChartOptions = angular.extend({}, $scope.defaultChartOptions);
        $scope
            .donutChartOptions
            .legendTemplate = "<ul class=\"doughnut__chart__legend\"><% for (var i=0; i<segments.length; i++){%><li class=\"doughnut__chart__legend__box\"><span class=\"doughnut__chart__legend__box__color\" style=\"background-color:<%=segments[i].fillColor%>\"></span><span class=\"doughnut__chart__legend__box__label\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>";

        /**
         * Open date picker
         * @param $event
         */
        $scope.openDatePicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.datePickerOpened = true;
        };

        /**
         * Minimum date to fetch insights.
         * @type {Date}
         */
        $scope.datePickerMinDate = $scope.statistics.model.firstExistingExpenseDate || moment().year(2000);

        /**
         * Maximum date to fetch insights.
         */
        $scope.datePickerMaxDate = $scope.statistics.model.lastExistingExpenseDate || moment().hours(0).minutes(0).seconds(0);

        /**
         * Exposed insight data (first define master copy).
         * @type {{spentDate: *}}
         */
        $scope.masterInsightData = {
            spentDate: moment().toDate()
        };

        /**
         * Exposed insight data.
         * @type {{spentDate: *}}
         */
        $scope.insightData = angular.copy($scope.masterInsightData);

        /**
         * Load insights
         */
        function loadInsight() {
            if ( $scope.isLoading ) {

                $scope.insightData = angular.copy($scope.masterInsightData);
                return;
            }

            $scope.isLoading = true;
            var computedInsightsData = angular.copy($scope.insightData);
            var from = moment(computedInsightsData.spentDate).startOf(MONTH);
            var to = moment(computedInsightsData.spentDate).endOf(MONTH);
            InsightService
                .fetchInsightsFromTo(from, to)
                .then(function (receivedInsight) {

                    /**
                     * Track event.
                     */
                    mixpanel.track(MIXPANEL_EVENTS.insightsFetched);

                    $timeout(function () {
                        if ( receivedInsight.isEmpty() ) {
                            // ---
                            // Reset the insight data.
                            // ---
                            $scope.insightData = angular.copy($scope.masterInsightData);
                            flash.to($scope.alertIdentifierId).info = "There are no expenses defined for selected period."
                        }
                        else {
                            // ---
                            // If there was a previously error, just clear it.
                            // ---
                            flash.to($scope.alertIdentifierId).error = '';

                            // ---
                            // Update everything.
                            // ---
                            $scope.masterInsightData = angular.copy($scope.insightData);
                            $scope.insight = receivedInsight;
                            $scope.insightLineData = [$scope.insight.model.insightData];
                            $scope.insightLineSeries = ["Categories"];
                        }

                        $scope.isLoading = false;

                    }, TIMEOUT_DURATION);
                })
                .catch(function () {

                    // ---
                    // Reset the insight data.
                    // ---
                    $scope.insightData = angular.copy($scope.masterInsightData);
                    flash.to($scope.alertIdentifierId).error = "Could not fetch insights.";
                    $scope.badPostSubmitResponse = true;
                    $scope.isLoading = false;
                });
        }

        /**
         * On date change do load insight
         */
        $scope.onChange = function () {
            loadInsight();
        };

        /**
         * Only if -1 month is at most the first existing expenses date.
         * @returns {boolean}
         */
        $scope.canLoadPrevMonth = function () {
            var currentSelectedDate = moment($scope.insightData.spentDate);
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
        $scope.prevMonth = function () {
            $scope.insightData.spentDate = moment($scope.insightData.spentDate).subtract(1, MONTH).toDate();

            loadInsight();
        };

        /**
         * Only if +1 month is at most the last existing expenses date.
         */
        $scope.canLoadNextMonth = function () {
            var currentSelectedDate = moment($scope.insightData.spentDate);
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
        $scope.nextMonth = function () {
            $scope.insightData.spentDate = moment($scope.insightData.spentDate).add(1, MONTH).toDate();

            loadInsight();
        };

        /**
         * Checks if in the given year are expenses defined.
         */
        function expensesExistsInYear(dateYear) {
            return _.has($scope.insightsMonthsPerYears.insightsMonthsPerYears, dateYear);
        }

        /**
         * Checks if in the given year and month are expenses defined.
         */
        function expensesExistsInMonthWithYear(givenDateYear, givenDateMonth) {
            return _.some(_.result($scope.insightsMonthsPerYears.insightsMonthsPerYears, givenDateYear), function (entry) {
                return entry === givenDateMonth;
            });
        }
    });
