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
                 * Selected category
                 * @type {{}}
                 */
                scope.category = {};

                /**
                 * Show block content
                 * @type {boolean}
                 */
                scope.showContent = false;

                /**
                 * We need an object in the scope as this model is changed by the
                 * datePicker and we want to see those changes. Remember '.' notation.
                 */
                scope.datePickerStatus = {};

                /**
                 * Toggle content
                 */
                scope.toggleContent = function () {
                    scope.showContent = !scope.showContent;

                    /**
                     * Max date to create expense
                     */
                    if ( scope.showContent ) {
                        scope.maxDate = moment().hours(0).minutes(0).seconds(0);
                    }
                };

                /**
                 * Toggle mark for bulk action
                 */
                scope.toggleMark = function () {
                    scope.expense.marked = !scope.expense.marked;
                };

                /**
                 * Open date picker
                 * @param $event
                 */
                scope.openDatePicker = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    scope.datePickerStatus.opened = true;
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
