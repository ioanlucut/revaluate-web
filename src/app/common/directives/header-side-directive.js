'use strict';

angular
    .module("revaluate.common")
    .directive("headerSide", function ($rootScope, StatesHandler, AuthService, AUTH_EVENTS, $state, $timeout) {
        return {
            restrict: "AE",
            templateUrl: "/app/common/partials/header-side-directive.tpl.html",
            link: function (scope) {

                /**
                 * Save state to scope
                 */
                scope.$state = $state;

                /**
                 * Reference to the current user.
                 */
                scope.currentUser = $rootScope.currentUser;

                /**
                 * Handles tour page link
                 */
                scope.goToTourPage = function () {

                    StatesHandler.goHome(function () {
                        $timeout(function () {
                            $rootScope.$broadcast("fullpage-scroll-to", { slideNumber: 2 });
                        })
                    });
                };

                scope.isUserAuthenticated = AuthService.isAuthenticated();

                scope.$on(AUTH_EVENTS.loginSuccess, function () {
                    scope.isUserAuthenticated = true;
                });

                scope.$on(AUTH_EVENTS.logoutSuccess, function () {
                    scope.isUserAuthenticated = false;
                });

            }
        };
    });

