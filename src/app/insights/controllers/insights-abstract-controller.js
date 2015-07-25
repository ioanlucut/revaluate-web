'use strict';

angular
    .module("revaluate.insights")
    .controller("InsightsAbstractController", function ($scope, $timeout, $rootScope, $filter, monthsPerYearsStatistics, UNISON_BREAKPOINTS, UNISON_EVENTS, resizeOnUpdate, getChartSetSize) {

        /* jshint validthis: true */
        var vm = this;

        /**
         * Month constant
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

        // ---
        // Specific donut chart options.
        // ---
        vm
            .donutChartOptions = angular.extend({}, defaultChartOptions);
        vm
            .donutChartOptions
            .legendTemplate = "<ul class=\"doughnut__chart__legend\"><% for (var i=0; i<segments.length; i++){%><li class=\"doughnut__chart__legend__box\"><span class=\"doughnut__chart__legend__box__color\" style=\"background-color:<%=segments[i].fillColor%>\"></span><span class=\"doughnut__chart__legend__box__label\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>";

        // ---
        // RESPONSIVE RELATED.
        // ---

        // ---
        // Updates bar data sets spacing values options (we do not want to have too fat bars - e.g. if there is only one column)
        // ---
        function adjustResizeChartOptionsAndSpacing(currentBreakpoint, chartSetSize) {
            if ( !resizeOnUpdate ) {
                return;
            }

            var breakpoint = _.find(UNISON_BREAKPOINTS, function (breakPointEntry) {
                return breakPointEntry.name === currentBreakpoint;
            });

            if ( breakpoint ) {
                var numberOfSets = chartSetSize || getChartSetSize();
                var spacing =
                    numberOfSets === 1
                        ? Math.floor(breakpoint.chartBarWidth * 1.5)
                        : Math.floor(breakpoint.chartBarWidth / numberOfSets);

                // ---
                // Update spacing.
                // ---
                $timeout(function () {
                    vm.barOptions = angular.extend(vm.barOptions, {
                        barValueSpacing: spacing,
                        barDatasetSpacing: spacing
                    })
                });

                console.log(currentBreakpoint + ' with size: ' + numberOfSets + ' and computed spacing: ' + spacing);
            }

        }

        // ---
        // Listen for the resize events.
        // ---
        $scope
            .$on(UNISON_EVENTS.USN_FIRE, function (event, args) {
                adjustResizeChartOptionsAndSpacing(args);
            });

        // ---
        // Listen for the chart reloaded event.
        // ---
        $scope
            .$on("chartsLoaded", function (event, args) {
                adjustResizeChartOptionsAndSpacing(Unison.fetch.now().name, args.size);
            });
    });
