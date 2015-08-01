(function () {
    'use strict';

    /**
     * Header directive responsible for header common template.
     */
    angular
        .module('revaluate.common')
        .directive('flashMessages', function () {
            return {
                scope: {
                    flash: '=',
                    identifierId: '@'
                },
                restrict: 'A',
                templateUrl: '/app/common/partials/flash-messages-directive.tpl.html',
                link: function () {
                }
            };
        });
}());
