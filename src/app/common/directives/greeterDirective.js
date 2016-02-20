(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .directive('greeter', function ($rootScope, $timeout) {
            return {
                restrict: 'E',
                scope: {
                    greet: '='
                },
                templateUrl: '/app/common/partials/greeterDirective.tpl.html',
                link: function (scope, el) {
                    var TIMEOUT = 1000;

                    scope.user = $rootScope.currentUser;

                    scope.$on('$viewContentLoaded', function () {
                        if (!el.is(':visible')) {
                            $timeout(function () {
                                el.show();
                            }, TIMEOUT);
                        }
                    });
                }
            };
        });
}());
