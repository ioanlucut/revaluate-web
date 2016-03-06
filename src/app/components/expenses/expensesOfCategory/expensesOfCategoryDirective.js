function ExpensesOfCategoryController(ALERTS_EVENTS, $scope, $rootScope, $timeout, DatesUtils, ExpenseService, promiseTracker) {

  var _this = this;

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
      .getAllExpensesOfCategory(_this.totalPerCategoryInsights.categoryDTO.id, period.from, period.to, _this.loadingTracker)
      .then(function (expenses) {
        _this.expensesOfThisCategory = expenses;
        handleShowAllFunctionality(_this.expensesOfThisCategory);
      })
      .catch(function () {
        $scope.$emit(ALERTS_EVENTS.DANGER, {
          message: 'Could not fetch expenses',
        });
      });
  };

  function handleShowAllFunctionality(expensesOfThisCategory) {
    // ---
    // If expenses length > length * 0,2.
    // ---
    _this.displayShowAllButton = expensesOfThisCategory.length > _this.expensesLimit + _this.expensesLimit * 0.2;
    _this.expensesLimit = _this.displayShowAllButton ? _this.expensesLimit : expensesOfThisCategory.length;
  }

}

function expensesOfCategoryDirective() {
  return {
    restrict: 'E',
    scope: {
      totalPerCategoryInsights: '=',
      monthYearDate: '=',
    },
    controller: ExpensesOfCategoryController,

    controllerAs: 'vm',
    templateUrl: '/app/components/expenses/expensesOfCategory/expensesOfCategoryDirective.tpl.html',
    link: function () {
    },
  };
}

export default expensesOfCategoryDirective;
