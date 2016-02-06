'use strict';

function MonthlyDailyInsightsController(EXPENSE_EVENTS, USER_ACTIVITY_EVENTS, ALERTS_EVENTS, $controller, $scope, $rootScope, $filter, InsightsGenerator, DatesUtils, InsightsService, promiseTracker, insightsDaily) {

    var vm = this;

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
        monthsPerYearsStatistics: null,
        resizeOnUpdate: false,
        getChartSetSize: function () {
        }
    }));

    // ---
    // Customize look.
    // ---
    vm.barOptions = angular.extend(vm.barOptions, {
        scaleLabel: function (label) {
            return vm.formatChartValue(label);
        },
        multiTooltipTemplate: function (label) {
            return vm.formatChartValue(label);
        },
        tooltipTemplate: function (label) {
            return vm.formatChartValue(label);
        },
        scaleShowHorizontalLines: false,
        scaleShowVerticalLines: false,
        scaleShowLabels: false,
        scaleShowGridLines: false,
        showScale: true,
        scaleFontSize: 10,
        tooltipFontSize: 12,
        tooltipTitleFontSize: 12,
        tooltipYPadding: 10,
        tooltipXPadding: 10,
        barValueSpacing: 2
    });

    /**
     * Load insights
     */
    vm.loadInsights = loadInsights;

    /**
     * Create a saving tracker.
     */
    vm.loadTracker = promiseTracker();

    // ---
    // Computed information and methods.
    // ---
    prepareDataForChart();

    function loadInsights() {
        var period = DatesUtils
            .fromLastMonthsToNow(1);

        InsightsService
            .fetchDailyInsightsFromTo(period.from, period.to, vm.loadTracker)
            .then(function (receivedInsight) {
                // ---
                // Update everything.
                // ---
                vm.insightsDaily = receivedInsight;

                prepareDataForChart();
                $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.insightsDailyFetched);
            })
            .catch(function () {
                vm.badPostSubmitResponse = true;
                $scope.$emit(ALERTS_EVENTS.DANGER, {
                    message: 'Could not fetch insights.'
                });
            });
    }

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
    // Reload chart if necessary upon delete/update/create..
    // ---

    $scope.$on(EXPENSE_EVENTS.isCreated, function (event, args) {
        tryToReloadIfNecessary(args);
    });
    $scope.$on(EXPENSE_EVENTS.isDeleted, function (event, args) {
        tryToReloadIfNecessary(args);
    });
    $scope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
        tryToReloadIfNecessary(args);
    });

    function tryToReloadIfNecessary(args) {
        if ( args.expense ) {
            reloadIfRequired(args.expense);
        } else if ( args.expenses ) {
            _.each(args.expenses, function (expenseCandidate) {
                reloadIfRequired(expenseCandidate);
            });
        }
    }

    function reloadIfRequired(expense) {
        var isSameMonth = moment().isSame(moment(expense.spentDate), 'month');

        if ( isSameMonth ) {
            vm.loadInsights();
        }
    }

}

export default angular
    .module('revaluate.expenses')
    .controller('MonthlyDailyInsightsController', MonthlyDailyInsightsController)
    .name;
