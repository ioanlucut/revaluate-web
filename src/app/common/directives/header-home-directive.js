'use strict';

/**
 * Header directive responsible for header common template.
 */
angular
    .module("revaluate.common")
    .directive("headerHome", function ($rootScope, StatesHandler, $timeout) {
        return {
            restrict: "A",
            templateUrl: "/app/common/partials/header-home.html",
            link: function (scope) {

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
                }

            }
        };
    });
