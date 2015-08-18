(function () {
    'use strict';

    /* Email list */

    angular
        .module('revaluate.expenses')
        .directive('expensesList', function ($rootScope, $timeout) {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    expenses: '=',
                    categories: '='
                },
                templateUrl: '/app/expenses/partials/expense/expenses-list-directive.tpl.html',
                link: function (scope, el, attrs) {

                    var TIMEOUT = 200;

                    /**
                     * The way of sort
                     */
                    scope.reverseOrder = attrs.sort === 'desc';

                    /**
                     * Current user.
                     */
                    scope.user = $rootScope.currentUser;

                    /**
                     * Is loading more expenses flag.
                     */
                    scope.isUpdatingListLayout = false;

                    /**
                     * Initial selected order by
                     */
                    scope.selectedOrderBy = 'model.createdDate';

                    /**
                     * On ng repeat expense finished
                     */
                    scope.$on('ngRepeatExpenseFinished', function () {
                        $timeout(function () {
                            scope.isInitiallyLoaded = true;
                        }, TIMEOUT);
                    });

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
