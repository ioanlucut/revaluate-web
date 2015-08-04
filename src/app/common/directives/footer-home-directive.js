(function () {
    'use strict';

    /**
     * Header directive responsible for header common template.
     */
    angular
        .module('revaluate.common')
        .directive('footerHome', function () {
            return {
                restrict: 'A',
                templateUrl: '/app/common/partials/footer-home-directive.tpl.html',
                link: function () {
                }
            };
        });
}());
