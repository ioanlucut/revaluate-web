angular
    .module("expenses")
    .directive("expenseEntry", function ($rootScope, EXPENSE_EVENTS) {
        return {
            restrict: "A",
            controller: 'ExpenseEntryController',
            scope: {
                categories: "=",
                expense: "="
            },
            templateUrl: "app/expenses/partials/expense/expense.entry.template.html",
            link: function (scope, el, attrs) {

                /**
                 * Current user.
                 */
                scope.user = $rootScope.currentUser;

                /**
                 * Keep the master backup
                 */
                scope.masterExpense = angular.copy(scope.expense);

                /**
                 * Show block content
                 * @type {boolean}
                 */
                scope.showContent = false;

                /**
                 * Toggle content
                 */
                scope.toggleContent = function () {
                    scope.showContent = !scope.showContent;
                };

                /**
                 * Toggle and discard changes.
                 */
                scope.cancel = function () {
                    scope.toggleContent();

                    scope.expense = angular.copy(scope.masterExpense);
                };

                /**
                 * On expense updated/deleted - hide everything.
                 */
                $rootScope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
                    if ( scope.expense.model.id === args.expense.model.id ) {
                        scope.toggleContent();

                        // ---
                        // Update the master expense.
                        // ---
                        scope.masterExpense = angular.copy(scope.expense);
                    }
                });
            }
        }
    });
