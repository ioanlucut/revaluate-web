'use strict';

angular
    .module("revaluate.common")
    .directive("sideHeader", function ($rootScope, StatesHandler, $state, $timeout) {
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
                }

            }
        };
    });

