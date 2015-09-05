(function () {
    'use strict';

    function GoalDisplayEntryController($rootScope) {

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
                controller: GoalDisplayEntryController,
                bindToController: true,
                controllerAs: 'vm',
                templateUrl: '/app/goals/partials/goals-display-entry-directive.tpl.html',
                link: function () {
                }
            };
        });
}());
