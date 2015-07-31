'use strict';

angular
    .module("revaluate.expenses")
    .directive("expensesOfCategory", function () {
        return {
            restrict: "E",
            scope: {
                totalPerCategoryInsights: "=",
                monthDate: "="
            },
            controller: function ($scope, $rootScope, $timeout, DatesUtils, ExpenseService, ALERTS_EVENTS) {

                this.LOAD_MORE_TIMEOUT = 500;
                this.DEFAULT_EXPENSES_LIMIT = 20;

                /* jshint validthis: true */
                var vm = this;

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
                this.monthDate = $scope.monthDate;

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
                 * Initial selected order by
                 */
                this.selectedOrderBy = 'model.createdDate';

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
                    if ( !this.expanded && !this.isEmptyTransactions() ) {
                        this.loadExpensesOfCategory();
                    }

                    $timeout(_.bind(function () {
                        this.expanded = !this.expanded
                    }, this), this.LOAD_MORE_TIMEOUT);
                };

                /**
                 * Sets the selected order by
                 */
                this.setSelectedOrderBy = function (by) {
                    this.isUpdatingListLayout = !this.isUpdatingListLayout;

                    $timeout(_.bind(function () {
                        this.selectedOrderBy = by;
                        this.isUpdatingListLayout = !this.isUpdatingListLayout
                    }, this), this.LOAD_MORE_TIMEOUT);
                };

                /**
                 * Expenses still to be loaded ?
                 */
                this.isExpensesLoaded = function () {
                    return this.expensesOfThisCategory.length > 0;
                };

                this.isEmptyTransactions = function () {
                    return this.totalPerCategoryInsights.numberOfTransactions === 0;
                };

                /**
                 * Load expenses of category
                 */
                this.loadExpensesOfCategory = function () {
                    if ( this.isExpensesLoaded() ) {
                        return;
                    }

                    this.isUpdatingListLayout = true;

                    var period = DatesUtils
                        .getFromToOfMonthYear(this.monthDate);

                    ExpenseService
                        .getAllExpensesOfCategory(vm.totalPerCategoryInsights.categoryDTO.id, period.from, period.to)
                        .then(function (expenses) {
                            vm.expensesOfThisCategory = expenses;
                        })
                        .catch(function () {
                            $scope.$emit(ALERTS_EVENTS.DANGER, {
                                message: "Could not fetch expenses for " + vm.totalPerCategoryInsights.categoryDTO.name,
                                alertId: vm.alertId
                            });
                        })
                        .finally(function () {
                            vm.isUpdatingListLayout = false;
                        })
                };

            },
            controllerAs: 'vm',
            templateUrl: "/app/expenses/partials/expense/expenses-of-category-directive.tpl.html",
            link: function (scope, el, attrs) {
            }
        }
    });
