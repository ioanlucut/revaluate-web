'use strict';

function GoalListController($timeout) {
    var vm = this,
        TIMEOUT = 200;

    /**
     * Initial selected order by
     */
    this.selectedOrderBy = 'createdDate';

    /**
     * Sets the selected order by
     */
    this.setSelectedOrderBy = setSelectedOrderBy;

    /**
     * Is loading more goals flag.
     */
    this.isUpdatingListLayout = false;

    function setSelectedOrderBy(by) {
        vm.isUpdatingListLayout = !vm.isUpdatingListLayout;

        $timeout(function () {
            vm.selectedOrderBy = by;
            vm.isUpdatingListLayout = !vm.isUpdatingListLayout;
        }, TIMEOUT);
    }
}

export default angular
    .module('revaluate.goals')
    .directive('goalsList', function () {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                goals: '=',
                categories: '='
            },
            controller: GoalListController,
            bindToController: true,
            controllerAs: 'vm',
            templateUrl: '/app/goals/partials/goals-list-directive.tpl.html',
            link: function (scope, el, attrs) {

                scope.reverseOrder = attrs.sort === 'desc';
            }
        };
    })
    .name;
