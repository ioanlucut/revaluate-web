'use strict';

angular
    .module("revaluate.insights")
    .controller("AbstractInsightsController", function ($scope, $rootScope, $filter, monthsPerYearsStatistics) {

        /* jshint validthis: true */
        var vm = this;

        /**
         * Month constant
         * @type {string}
         */
        vm.MONTH = 'month';

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        vm.user = $rootScope.currentUser;

        /**
         * Insights months per years.
         */
        vm.monthsPerYearsStatistics = monthsPerYearsStatistics;

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

        /**
         * Updates bar value spacing options (we do not want to have too fat bars - if there is only one column)
         */
        vm.updateBarWidthWith = function (numberOfColumns) {
            var computed = 100 / numberOfColumns;
            if ( numberOfColumns === 1 ) {
                computed = 200;
            }
            vm.barOptions = angular.extend(vm.barOptions, { barValueSpacing: computed });
        };

        /**
         * Updates bar value spacing options (we do not want to have too fat bars - if there is only one column)
         */
        vm.updateBarDataSetSpacingWidthWith = function (numberOfDataSets) {
            var computed = 100 / numberOfDataSets;
            if ( numberOfDataSets === 1 ) {
                computed = 200;
            }
            vm.barOptions = angular.extend(vm.barOptions, { barDatasetSpacing: computed });
        };

        // ---
        // Specific donut chart options.
        // ---
        vm
            .donutChartOptions = angular.extend({}, defaultChartOptions);
        vm
            .donutChartOptions
            .legendTemplate = "<ul class=\"doughnut__chart__legend\"><% for (var i=0; i<segments.length; i++){%><li class=\"doughnut__chart__legend__box\"><span class=\"doughnut__chart__legend__box__color\" style=\"background-color:<%=segments[i].fillColor%>\"></span><span class=\"doughnut__chart__legend__box__label\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>";
    });
