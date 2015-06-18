'use strict';

/**
 * expenses controller.
 */
angular
    .module("revaluate.insights")
    .controller("InsightController", function ($templateCache, $scope, $rootScope, $filter, $timeout, flash, insight, statistics, InsightService, MIXPANEL_EVENTS, INSIGHTS_CHARTS, ALERTS_CONSTANTS) {

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

        $scope.donutChartOptions = angular.extend({}, $scope.defaultChartOptions);
        $scope.donutChartOptions.legendTemplate =  "<ul class=\"doughnut__chart\"><% for (var i=0; i<segments.length; i++){%><li class=\"doughnut__chart__legend\"><span class=\"doughnut__chart__legend__color\" style=\"background-color:<%=segments[i].fillColor%>\"></span><span class=\"doughnut__chart__legend__label\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>";

        function formatValue(label) {
            return $filter('currency')(label.value.toString(), $scope.user.model.currency.symbol);
        }

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
         * Submitted from inside the form.
         */
        $scope.submitLoadInsight = function () {
            if ( !$scope.insightForm.$valid ) {
                return;
            }

            var isDateInFuture = moment().diff($scope.insightData.spentDate || $scope.insightForm.spentDate) <= 0;
            if ( isDateInFuture ) {
                $scope.insightForm.spentDate.$setValidity('validDate', false);

                return;
            }

            // ---
            // Now load the insights.
            // ---
            loadInsight();
        };

        /**
         * On date change do load insight
         */
        $scope.onChange = function () {
            loadInsight();
        };

        /**
         * Go to previous month
         */
        $scope.prevMonth = function () {
            $scope.insightData.spentDate = moment($scope.insightData.spentDate).subtract(1, MONTH).toDate();

            loadInsight();
        };

        /**
         * Only if -1 month is at most the first existing expenses date.
         * @returns {boolean}
         */
        $scope.canLoadPrevMonth = function () {

            // a - b < 0 or a - b > 0
            return moment($scope.insightData.spentDate).diff($scope.statistics.model.firstExistingExpenseDate) >= 0;
        };

        /**
         * Go to next month
         */
        $scope.nextMonth = function () {
            $scope.insightData.spentDate = moment($scope.insightData.spentDate).add(1, MONTH).toDate();

            loadInsight();
        };

        /**
         * Only if +1 month is at most the last existing expenses date.
         * @returns {boolean}
         */
        $scope.canLoadNextMonth = function () {

            return moment($scope.insightData.spentDate).diff($scope.statistics.model.lastExistingExpenseDate) <= 0;
        }
    })
;
