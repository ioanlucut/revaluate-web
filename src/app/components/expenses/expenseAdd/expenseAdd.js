function AddExpenseController(EXPENSE_EVENTS,
                              APP_CONFIG,
                              $scope,
                              $rootScope,
                              ExpenseService,
                              Expense,
                              promiseTracker) {
  'ngInject';

  const _this = this;

  /**
   * Current user.
   */
  _this.user = $rootScope.currentUser;

  /**
   * Create a saving tracker.
   */
  _this.saveTracker = promiseTracker();

  /**
   * Initialize or reset the add expense form
   */
  _this.initOrResetAddExpense = initOrResetAddExpense;

  /**
   * The save expense functionality
   */
  _this.saveExpense = saveExpense;

  /**
   * Open date picker
   */
  _this.openDatePicker = openDatePicker;

  /**
   * Minimum date to create expense.
   */
  _this.datePickerMinDate = angular.copy(APP_CONFIG.EXPENSES_ALLOWED_MIN_DATE);

  /**
   * Perform the first initialization.
   */
  _this.initOrResetAddExpense();

  function initOrResetAddExpense() {
    _this.expense = new Expense({
      spentDate: moment().toDate(),
    });

    _this.category = {};

    if (_this.expenseForm) {
      _this.expenseForm.$setPristine();
    }

    _this.badPostSubmitResponse = false;

    /**
     * Max date to create expense
     */
    _this.datePickerMaxDate = moment().hours(0).minutes(0).seconds(0);
  }

  function saveExpense() {
    _this.expense.category = angular.copy(_this.category.selected);

    ExpenseService
      .createExpense(_this.expense, _this.saveTracker)
      .then(createdExpense => {
        $rootScope.$broadcast(EXPENSE_EVENTS.isCreated, { expense: createdExpense });
        _this.initOrResetAddExpense();
      })
      .catch(() => {
        _this.badPostSubmitResponse = true;
        $scope.$emit(
          EXPENSE_EVENTS.isErrorOccurred,
          { errorMessage: 'Ups, something went wrong.' }
        );
      });
  }

  function openDatePicker($event) {
    $event.preventDefault();
    $event.stopPropagation();

    _this.datePickerOpened = true;
  }

}

let expenseAdd = {
  restrict: 'A',
  bindings: {
    categories: '=',
  },
  controller: AddExpenseController,
  templateUrl: '/app/components/expenses/expenseAdd/expenseAdd.tpl.html',
};

export default expenseAdd;
