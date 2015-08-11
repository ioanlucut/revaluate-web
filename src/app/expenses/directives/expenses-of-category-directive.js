(function () {
    'use strict';

    angular
        .module('revaluate.expenses')
        .directive('expensesOfCategory', function () {
            return {
                restrict: 'E',
                scope: {
                    totalPerCategoryInsights: '=',
                    monthYearDate: '='
                },
                controller: function ($scope, $rootScope, $timeout, DatesUtils, ExpenseService, ALERTS_EVENTS) {
                    /* jshint validthis: true */
                    var vm = this;

                    this.LOAD_MORE_TIMEOUT = 300;
                    this.DEFAULT_EXPENSES_LIMIT = 20;

                    /**
                     * Current user.
                     */
                    this.user = $rootScope.currentUser;

                    /**
                     * Save it into this.
                     */
                    this.totalPerCategoryInsights = $scope.totalPerCategoryInsights;

                    /**
                     * Month date saved
                     * @type {string|*}
                     */
                    this.monthYearDate = $scope.monthYearDate;

                    /**
                     * Is loading more expenses flag.
                     * @type {boolean}
                     */
                    this.isUpdatingListLayout = false;

                    /**
                     * Past expenses limit - initially has the default value.
                     * @type {number}
                     */
                    this.expensesLimit = this.DEFAULT_EXPENSES_LIMIT;

                    /**
                     * Expenses of this category
                     * @type {Array}
                     */
                    this.expensesOfThisCategory = [];

                    /**
                     * Expanded status
                     * @type {boolean}
                     */
                    this.expanded = false;

                    /**
                     * Sets the selected order by
                     */
                    this.toggleContent = function () {
                        if (!this.expanded && !this.isEmptyTransactions()) {
                            this.loadExpensesOfCategory();
                        }

                        $timeout(_.bind(function () {
                            this.expanded = !this.expanded
                        }, this));
                    };

                    /**
                     * First batch of expenses are loaded ?
                     */
                    this.isExpensesLoaded = function () {
                        return this.expensesOfThisCategory.length > 0;
                    };

                    this.isEmptyTransactions = function () {
                        return this.totalPerCategoryInsights.numberOfTransactions === 0;
                    };

                    /**
                     * Show all expenses.
                     */
                    this.showAllExpenses = function () {
                        this.isUpdatingListLayout = !this.isUpdatingListLayout;

                        $timeout(_.bind(function () {
                            this.expensesLimit = this.expensesOfThisCategory.length;
                            this.isUpdatingListLayout = !this.isUpdatingListLayout;
                            this.displayShowAllButton = false;
                        }, this), this.LOAD_MORE_TIMEOUT);
                    };

                    function handleShowAllFunctionality(expensesOfThisCategory) {
                        // ---
                        // If expenses length > length * 0,2.
                        // ---
                        vm.displayShowAllButton = expensesOfThisCategory.length > vm.expensesLimit + vm.expensesLimit * 0.2;

                        vm.expensesLimit = vm.displayShowAllButton
                            ? vm.expensesLimit
                            : expensesOfThisCategory.length;
                    }

                    /**
                     * Load expenses of category
                     */
                    this.loadExpensesOfCategory = function () {
                        var period;

                        if (this.isExpensesLoaded()) {
                            return;
                        }

                        this.isUpdatingListLayout = true;

                        period = DatesUtils
                            .getFromToOfMonthYear(this.monthYearDate);

                        ExpenseService
                            .getAllExpensesOfCategory(vm.totalPerCategoryInsights.categoryDTO.id, period.from, period.to)
                            .then(function (expenses) {
                                vm.expensesOfThisCategory = expenses;
                                handleShowAllFunctionality(vm.expensesOfThisCategory);
                            })
                            .catch(function () {
                                $scope.$emit(ALERTS_EVENTS.DANGER, {
                                    message: 'Could not fetch expenses for ' + vm.totalPerCategoryInsights.categoryDTO.name
                                });
                            })
                            .finally(function () {
                                vm.isUpdatingListLayout = false;
                            })
                    };

                },

                controllerAs: 'vm',
                templateUrl: '/app/expenses/partials/expense/expenses-of-category-directive.tpl.html',
                link: function (scope, el, attrs) {
                }
            }
        });
}());
