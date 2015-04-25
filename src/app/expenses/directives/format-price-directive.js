angular
    .module("expenses")
    .directive('formatPrice', ['$filter', function ($filter) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if ( !ctrl ) return;

                var options = {
                    prefix: '',
                    centsSeparator: ',',
                    thousandsSeparator: '.'
                };

                /*First time format*/
                ctrl.$formatters.unshift(function () {
                    elem[0].value = ctrl.$modelValue;
                    elem.priceFormat(options);
                    return elem[0].value;
                });

                /*Parser*/
                ctrl.$parsers.unshift(function () {
                    elem.priceFormat(options);

                    return elem[0].value.replace(/\./g, '').replace(/,/g, '.');
                });
            }
        };
    }]);