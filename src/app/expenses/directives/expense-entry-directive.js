(function () {
    'use strict';

    angular
        .module('revaluate.expenses')
        .directive('expenseEntry', function ($rootScope, $timeout, EXPENSE_EVENTS, Category) {
            return {
                restrict: 'A',
                scope: {
                    categories: '=',
                    expense: '='
                },
                controller: function ($scope, $rootScope, Expense, $timeout, EXPENSE_EVENTS) {

                    var vm = this,
                        MIN_YEAR_TO_CREATE_EXPENSE = 1800;

                    /**
                     * Minimum date to create expense.
                     */
                    this.minDate = moment().year(MIN_YEAR_TO_CREATE_EXPENSE);

                    /**
                     * Update the expense.
                     */
                    this.updateExpense = function (expenseForm, expense, category) {
                        var isDateInFuture = moment().diff(expense.model.spentDate || expenseForm.spentDate) <= 0;

                        if (expenseForm.$valid && !this.isUpdating) {

                            if (isDateInFuture) {
                                expenseForm.spentDate.$setValidity('validDate', false);

                                return;
                            }

                            // Is saving expense
                            this.isUpdating = true;

                            // Update the chosen category - if defined
                            if (category && category.selected) {
                                expense.model.category = angular.copy(category.selected);
                            }

                            expense
                                .save()
                                .then(function () {
                                    $rootScope.$broadcast(EXPENSE_EVENTS.isUpdated, {
                                        expense: expense
                                    });
                                })
                                .catch(function () {
                                    vm.badPostSubmitResponse = true;
                                    $rootScope.$broadcast(EXPENSE_EVENTS.isErrorOccurred, 'We\'ve encountered an error while trying to update this expense.');
                                })
                                .finally(function () {
                                    vm.isUpdating = false;
                                })
                        }
                    };
                },
                controllerAs: 'vm',
                templateUrl: '/app/expenses/partials/expenses-entry-directive.tpl.html',
                link: function (scope, el, attrs) {

                    var EXPENSE_INPUT_SELECTOR = '.expense__form__price__input';

                    /**
                     * If date details should be shown
                     */
                    scope.showDateDetails = !_.isUndefined(attrs.showDateDetails);

                    /**
                     * Current user.
                     */
                    scope.user = $rootScope.currentUser;

                    /**
                     * Keep the master backup. Work only with shownExpense.
                     */
                    scope.shownExpense = angular.copy(scope.expense);

                    /**
                     * Selected category
                     * @type {{}}
                     */
                    scope.category = {};
                    scope.category.selected = new Category(scope.shownExpense.model.category);

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

                        // ---
                        // Auto focus price.
                        // ---
                        if (scope.showContent) {
                            $timeout(function () {
                                el.find(EXPENSE_INPUT_SELECTOR).focus();
                            });

                            /**
                             * Max date to create expense
                             */
                            scope.maxDate = moment().hours(0).minutes(0).seconds(0);
                        }
                    };

                    /**
                     * Toggle mark for bulk action
                     */
                    scope.toggleMark = function () {
                        scope.expense.marked = !scope.expense.marked;

                        // ---
                        // We need this info also in the parent scope, so we synchronize the master too.
                        // ---
                        scope.shownExpense.marked = scope.expense.marked;
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

                        scope.shownExpense = angular.copy(scope.expense);
                    };

                    /**
                     * On expense updated/deleted - cancel edit mode.
                     */
                    $rootScope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
                        if (scope.expense.model.id === args.expense.model.id) {

                            // ---
                            // Now update the master expense, and remove the marked sign.
                            // ---
                            scope.shownExpense.marked = false;
                            scope.expense = angular.copy(scope.shownExpense);

                            scope.cancel();
                        }
                    });
                }
            }
        });
}());
