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

                    var LOAD_MORE_TIMEOUT = 500,
                        DEFAULT_EXPENSES_LIMIT = 20;

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
                     * Default number of expenses to be displayed.
                     * @type {number}
                     */
                    scope.defaultExpensesLimit = DEFAULT_EXPENSES_LIMIT;

                    /**
                     * Is loading more expenses flag.
                     * @type {boolean}
                     */
                    scope.isUpdatingListLayout = false;

                    /**
                     * Past expenses limit - initially has the default value.
                     * @type {number}
                     */
                    scope.expensesLimit = scope.defaultExpensesLimit;

                    /**
                     * Show past expenses block content
                     * @type {boolean}
                     */
                    scope.showExpensesContent = true;

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
                        }, LOAD_MORE_TIMEOUT);
                    };

                    /**
                     * Load more expenses.
                     */
                    scope.loadMoreExpenses = function () {
                        scope.isUpdatingListLayout = !scope.isUpdatingListLayout;

                        $timeout(function () {
                            scope.expensesLimit = scope.expensesLimit + scope.defaultExpensesLimit;
                            scope.isUpdatingListLayout = !scope.isUpdatingListLayout;
                        }, LOAD_MORE_TIMEOUT);
                    };

                    /**
                     * Expenses still to be loaded ?
                     * @returns {boolean}
                     */
                    scope.isStillExpensesToBeLoaded = function () {
                        return scope.expensesLimit < scope.expenses.length;
                    };
                }
            }
        });
}());
