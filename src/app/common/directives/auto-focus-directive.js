(function () {
    'use strict';

    /* Auto focus */

    angular
        .module('revaluate.common')
        .directive('autoFocus', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (!attrs.autoFocus) {

                        $timeout(function () {
                            el.focus();
                        });
                    } else {

                        // Watch the specified model, and auto-focus the element when the model is "true"
                        scope.$watch(attrs.autoFocus, function (val) {
                            if (val === true) {
                                $timeout(function () {
                                    el.focus();
                                });
                            }
                        });
                    }
                }
            };
        });
}());
