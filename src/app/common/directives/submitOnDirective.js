(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .directive('submitOn', function ($timeout) {
            return {
                link: function (scope, elm, attrs) {
                    scope.$on(attrs.submitOn, function () {
                        $timeout(function () {
                            elm.trigger('submit');
                        });
                    });
                }
            };
        });
}());
