'use strict';

/**
 * Header directive responsible for header common template.
 */
angular
    .module("revaluate.common")
    .directive("header", function ($rootScope, $state) {
        return {
            restrict: "A",
            templateUrl: "/app/common/partials/header.html",
            link: function (scope, el) {
                scope.$state = $state;
            }
        };
    });
