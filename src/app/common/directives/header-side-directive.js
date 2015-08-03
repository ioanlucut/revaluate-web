(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .directive('headerSide', function () {
            return {
                restrict: 'AE',
                templateUrl: '/app/common/partials/header-side-directive.tpl.html',
                controller: 'HeaderController',
                controllerAs: 'vm',
                link: function () {
                }
            };
        });
}());
