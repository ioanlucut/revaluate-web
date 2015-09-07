(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .directive('escapeHtml', function () {
            return {
                require: '?ngModel',
                link: function (scope, elem, attrs, ctrl) {
                    if (!ctrl) {
                        return;
                    }

                    ctrl.$parsers.unshift(function (value) {
                        if (value === '' || value === null || value === undefined) {
                            // null means that there is no value which is fine
                            return null;
                        }

                        return _.escape(value);
                    });
                }
            };
        });
}());
