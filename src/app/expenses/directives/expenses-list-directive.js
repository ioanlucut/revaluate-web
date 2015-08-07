(function () {
    'use strict';

    /* Email list */

    angular
        .module('revaluate.expenses')
        .directive('expensesList', function ($rootScope, $timeout) {
            return {
                restrict: 'A',
                scope: {
                    expenses: '=',
                    categories: '=',
                    searchByText: '='
                },
                templateUrl: '/app/expenses/partials/expense/expenses-list-directive.tpl.html',
                link: function (scope, el, attrs) {

                    var TIMEOUT = 200;

                    /**
                     * The way of sort
                     * @type {boolean}
                     */
                    scope.reverseOrder = attrs.sort === 'desc';

                    /**
                     * Current user.
                     */
                    scope.user = $rootScope.currentUser;

                    /**
                     * Is loading more expenses flag.
                     * @type {boolean}
                     */
                    scope.isUpdatingListLayout = false;

                    /**
                     * Initial selected order by
                     */
                    scope.selectedOrderBy = 'model.createdDate';

                    /**
                     * Sets the selected order by
                     */
                    scope.setSelectedOrderBy = function (by) {
                        scope.isUpdatingListLayout = !scope.isUpdatingListLayout;

                        $timeout(function () {
                            scope.selectedOrderBy = by;
                            scope.isUpdatingListLayout = !scope.isUpdatingListLayout
                        }, TIMEOUT);
                    };
                }
            }
        });
}());
