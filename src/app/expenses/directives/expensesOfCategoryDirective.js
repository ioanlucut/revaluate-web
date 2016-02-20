(function () {
    'use strict';

    function ExpensesOfCategoryController(ALERTS_EVENTS, $scope, $rootScope, $timeout, DatesUtils, ExpenseService, promiseTracker) {

        var vm = this;

        this.DEFAULT_EXPENSES_LIMIT = 50;

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
         */
        this.monthYearDate = $scope.monthYearDate;

        /**
         * Create an updating tracker.
         */
        this.loadingTracker = promiseTracker();

        /**
         * Past expenses limit - initially has the default value.
         */
        this.expensesLimit = this.DEFAULT_EXPENSES_LIMIT;

        /**
         * Expenses of this category
         */
        this.expensesOfThisCategory = [];

        /**
         * Expanded status
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
                this.expanded = !this.expanded;
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
            }, this));
        };

        /**
         * Load expenses of category
         */
        this.loadExpensesOfCategory = function () {
            var period;

            if (this.isExpensesLoaded()) {
                return;
            }

            period = DatesUtils
                .getFromToOfMonthYear(this.monthYearDate);

            ExpenseService
                .getAllExpensesOfCategory(vm.totalPerCategoryInsights.categoryDTO.id, period.from, period.to, vm.loadingTracker)
                .then(function (expenses) {
                    vm.expensesOfThisCategory = expenses;
                    handleShowAllFunctionality(vm.expensesOfThisCategory);
                })
                .catch(function () {
                    $scope.$emit(ALERTS_EVENTS.DANGER, {
                        message: 'Could not fetch expenses'
                    });
                });
        };

        function handleShowAllFunctionality(expensesOfThisCategory) {
            // ---
            // If expenses length > length * 0,2.
            // ---
            vm.displayShowAllButton = expensesOfThisCategory.length > vm.expensesLimit + vm.expensesLimit * 0.2;
            vm.expensesLimit = vm.displayShowAllButton ? vm.expensesLimit : expensesOfThisCategory.length;
        }

    }

    angular
        .module('revaluate.expenses')
        .directive('expensesOfCategory', function () {
            return {
                restrict: 'E',
                scope: {
                    totalPerCategoryInsights: '=',
                    monthYearDate: '='
                },
                controller: ExpensesOfCategoryController,

                controllerAs: 'vm',
                templateUrl: '/app/expenses/partials/expensesOfCategoryDirective.tpl.html',
                link: function () {
                }
            };
        });
}());
