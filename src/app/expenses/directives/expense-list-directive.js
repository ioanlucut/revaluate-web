/* Email list */

angular
    .module("expenses")
    .directive("expenseList", function ($rootScope, $timeout, EXPENSE_EVENTS) {
        return {
            restrict: "A",
            scope: {
                expenses: "=",
                categories: "=",
                searchByText: "="
            },
            templateUrl: "app/expenses/partials/expense/expense.list.template.html",
            link: function (scope, el, attrs) {

                /**
                 * The way of sort
                 * @type {boolean}
                 */
                scope.reverseOrder = attrs.sort === "desc";

                /**
                 * Load more timeout
                 * @type {number}
                 */
                var LOAD_MORE_TIMEOUT = 500;

                /**
                 * Current user.
                 */
                scope.user = $rootScope.currentUser;

                /**
                 * Default number of expenses to be displayed.
                 * @type {number}
                 */
                scope.defaultExpensesLimit = 20;

                /**
                 * Number of the filtered expenses
                 */
                scope.filteredExpenses = 0;

                /**
                 * Tells if the search by is activated;
                 */
                scope.isSearchByActivated = function () {
                    return scope.searchByText !== "" && !_.isUndefined(scope.searchByText);
                };

                /**
                 * Is loading more expenses flag.
                 * @type {boolean}
                 */
                scope.isLoadingMore = false;

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
                 * If empty expenses content message should be shown
                 * @type {boolean}
                 */
                scope.showEmptyExpensesContent = attrs.showEmptyContent === "true";

                // ---
                // Set up the toggle expenses content functionality.
                // ---

                if ( attrs.toggleContent === "true" ) {

                    /**
                     * Set expenses content settings
                     * @type {boolean}
                     */
                    scope.showExpensesContent = false;

                    /**
                     * Toggle past expenses content.
                     */
                    scope.togglePastExpensesContent = function () {
                        scope.showExpensesContent = !scope.showExpensesContent;
                    };
                }

                /**
                 * Load more upcoming expenses.
                 */
                scope.loadMoreExpenses = function () {
                    scope.isLoadingMore = !scope.isLoadingMore;

                    $timeout(function () {
                        scope.expensesLimit = scope.expensesLimit + scope.defaultExpensesLimit;
                        scope.isLoadingMore = !scope.isLoadingMore;
                    }, LOAD_MORE_TIMEOUT);
                };

                /**
                 * Past expenses still to be loaded ?
                 * @returns {boolean}
                 */
                scope.isStillExpensesToBeLoaded = function () {
                    return scope.expensesLimit < scope.expenses.length;
                };
            }
        }
    });
