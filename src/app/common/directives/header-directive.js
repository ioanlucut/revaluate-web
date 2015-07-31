'use strict';

angular
    .module("revaluate.common")
    .directive("header", function () {
        return {
            restrict: "A",
            templateUrl: "/app/common/partials/header-directive.tpl.html",
            controller: "HeaderController",
            controllerAs: 'vm',
            link: function () {
            }
        };
    });
