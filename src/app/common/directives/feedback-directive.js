'use strict';

angular
    .module("revaluate.common")
    .directive("feedback", function ($rootScope, AuthService, AUTH_EVENTS, $timeout) {
        return {
            restrict: "A",
            templateUrl: "/app/common/partials/feedback.html",
            link: function (scope, el) {
                var TIMEOUT = 2000;

                scope.isUserAuthenticated = AuthService.isAuthenticated();

                /**
                 * Listen to login success event. If user is properly logged in,
                 * then make sure we show the logged in contact form.
                 */
                scope.$on(AUTH_EVENTS.loginSuccess, function () {
                    scope.isUserAuthenticated = true;
                });

                scope.$on(AUTH_EVENTS.logoutSuccess, function () {
                    scope.isUserAuthenticated = false;
                });

                scope.$on('$viewContentLoaded', function () {
                    if ( !el.is(':visible') ) {
                        $timeout(function () {
                            el.show();
                        }, TIMEOUT);
                    }
                });
            }
        };
    });
