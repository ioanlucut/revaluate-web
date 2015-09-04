(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .directive('formatPrice', function () {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {
                    elm
                        .bind('blur', function () {
                            if (!ctrl.$modelValue) {
                                return;
                            }

                            ctrl.$viewValue = asViewValue(ctrl.$modelValue);
                            ctrl.$render();
                        });

                    ctrl.$formatters.push(function (value) {
                        if (_.isUndefined(value) || _.isEmpty(value)) {
                            return '';
                        }

                        return asViewValue(value);
                    });

                    ctrl.$parsers.push(function (inputValue) {
                        if (_.isUndefined(inputValue) || _.isEmpty(inputValue)) {
                            return null;
                        }

                        return accounting.unformat(inputValue, ',').toFixed(2);
                    });

                    function asViewValue(value) {
                        return accounting.formatMoney(value, '', 2, ".", ",");
                    }

                }
            };
        });
}());
