'use strict';

angular
    .module("revaluate.common")
    .directive("sideMenu", function ($rootScope, AuthService, AUTH_EVENTS) {
        return {
            restrict: "E",
            templateUrl: "/app/common/partials/side-menu-directive-tpl.html",
            link: function (scope) {
                scope.isUserAuthenticated = AuthService.isAuthenticated();

                scope
                    .$on(AUTH_EVENTS.loginSuccess, function () {
                        scope.isUserAuthenticated = true;
                    });

                scope
                    .$on(AUTH_EVENTS.logoutSuccess, function () {
                        scope.isUserAuthenticated = false;
                    });
            }
        };
    });
