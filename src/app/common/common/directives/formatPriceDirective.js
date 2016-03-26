function formatPriceDirective() {
  return {
    require: 'ngModel',
    link(scope, elm, attrs, ctrl) {
      const DEFAULT_DECIMALS = 2, decimals = (!_.isUndefined(attrs.decimals) && _.isNumber(_.parseInt(attrs.decimals))) ? _.parseInt(attrs.decimals) : DEFAULT_DECIMALS;

      elm
        .bind('blur', () => {
          if (!ctrl.$modelValue) {
            return;
          }

          ctrl.$viewValue = asViewValue(ctrl.$modelValue);
          ctrl.$render();
        });

      ctrl.$formatters.push(value => {
        if (_.isUndefined(value) || _.isNaN(value)) {
          return null;
        }

        return asViewValue(value);
      });

      ctrl.$parsers.push(inputValue => {
        if (_.isUndefined(inputValue) || _.isNaN(inputValue)) {
          return null;
        }

        return accounting.unformat(inputValue, '.').toFixed(decimals);
      });

      function asViewValue(value) {
        // number, symbol, precision, thousand, decimal, format
        return accounting.formatMoney(value, '', decimals, ',', '.');
      }

    },
  };
}

export default formatPriceDirective;
