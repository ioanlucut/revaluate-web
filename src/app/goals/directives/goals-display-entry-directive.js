(function () {
    'use strict';

    function GoalsDisplayEntryController($rootScope) {

        /**
         * Current user.
         */
        this.user = $rootScope.currentUser;
    }

    angular
        .module('revaluate.goals')
        .directive('goalsDisplayEntry', function () {
            return {
                restrict: 'A',
                scope: {
                    goal: '='
                },
                controller: GoalsDisplayEntryController,
                bindToController: true,
                controllerAs: 'vm',
                templateUrl: '/app/goals/partials/goals-display-entry-directive.tpl.html',
                link: function () {
                }
            };
        });
}());
