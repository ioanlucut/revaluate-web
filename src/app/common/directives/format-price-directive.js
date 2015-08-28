(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .directive('formatPrice', function () {
            return {
                require: '?ngModel',
                link: function (scope, elem, attrs, ctrl) {
                    var options = {
                        prefix: '',
                        centsSeparator: ',',
                        thousandsSeparator: '.'
                    };

                    if (!ctrl) {
                        return;
                    }

                    /*First time format*/
                    ctrl.$formatters.unshift(function () {
                        elem[0].value = parseInt(ctrl.$modelValue, 10) * 100;
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
        });
}());
