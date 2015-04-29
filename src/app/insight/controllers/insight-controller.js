/**
 * expenses controller.
 */
angular
    .module("insights")
    .controller("InsightController", function ($scope, $rootScope, $timeout, flash, insight, InsightService, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {

        /**
         * Updating/deleting timeout
         */
        var TIMEOUT_DURATION = 300;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.insights;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.insightsPage);

        /**
         * Default insights loaded.
         * @type {insight|*}
         */
        $scope.insight = insight;
        $scope.insightLineData = [insight.model.insightData];
        $scope.insightLineSeries = ["Categories"];

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
        $scope.datePickerMinDate = moment().year(2000);

        /**
         * Maximum date to fetch insights.
         */
        $scope.datePickerMaxDate = moment().hours(0).minutes(0).seconds(0);

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
        $scope.loadInsights = function () {
            if ( $scope.insightForm.$valid && !$scope.isLoading ) {

                var isDateInFuture = moment().diff($scope.insightData.spentDate || $scope.insightForm.spentDate) <= 0;
                if ( isDateInFuture ) {
                    $scope.insightForm.spentDate.$setValidity('validDate', false);

                    return;
                }
                $scope.isLoading = true;

                var computedInsightsData = angular.copy($scope.insightData);
                var from = moment(computedInsightsData.spentDate).startOf('month');
                var to = moment(computedInsightsData.spentDate).endOf('month');
                InsightService
                    .fetchInsightsFromTo(from, to)
                    .then(function (receivedInsight) {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.insightsFetched);

                        $timeout(function () {
                            $scope.isLoading = false;

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
                                $scope.insightLineData = [$scope.insight.model.insightData];
                                $scope.insightLineSeries = ["Categories"];
                            }

                        }, TIMEOUT_DURATION);
                    })
                    .catch(function () {

                        flash.to($scope.alertIdentifierId).error = "Could not fetch insights.";
                        $scope.isLoading = false;
                        $scope.badPostSubmitResponse = true;
                    });
            }
        };

        /**
         * On date change
         */
        $scope.onChange = function () {
            $scope.loadInsights();
        }
    });