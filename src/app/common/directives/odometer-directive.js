'use strict';

export default angular
    .module('revaluate.common')
    .directive('odometer', function (APP_STATS) {
        var defaults = {
            value: APP_STATS.EXPENSES_COUNTS,
            format: '(,ddd)'
        };

        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                var odometer, opts;

                opts = scope.$eval(attrs.odometerOptions) || {};
                angular.extend(opts, defaults);
                opts.el = elm[0];

                odometer = new Odometer(opts);

                scope.$on('update-app-stats', function (event, args) {
                    odometer.update(_.parseInt(args.appStats.EXPENSES_COUNTS));
                });
            }
        };
    }
)
    .name;
