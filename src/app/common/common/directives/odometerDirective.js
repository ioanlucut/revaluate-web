function odometerDirective(APP_STATS) {
  const defaults = {
    value: APP_STATS.EXPENSES_COUNTS,
    format: '(,ddd)',
  };

  return {
    restrict: 'A',
    link(scope, elm, attrs) {
      let odometer, opts;

      opts = scope.$eval(attrs.odometerOptions) || {};
      angular.extend(opts, defaults);
      opts.el = elm[0];

      odometer = new Odometer(opts);

      scope.$on('update-app-stats', (event, args) => {
        odometer.update(_.parseInt(args.appStats.EXPENSES_COUNTS));
      });
    },
  };
}

export default odometerDirective;
