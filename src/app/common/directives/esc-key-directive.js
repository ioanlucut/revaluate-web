(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .directive('escKey', function () {
            return function (scope, element, attrs) {
                element.bind('keydown keypress', function (event) {
                    if (event.which === 27) { // 27 = esc key
                        scope.$apply(function () {
                            scope.$eval(attrs.escKey);
                        });

                        event.preventDefault();
                    }
                });
            };
        });
}());
