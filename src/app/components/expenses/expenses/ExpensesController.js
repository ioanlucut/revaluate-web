function ExpensesController(EXPENSE_EVENTS,
                            ALERTS_EVENTS,
                            USER_ACTIVITY_EVENTS,
                            ALERTS_CONSTANTS,
                            APP_CONFIG,
                            $scope,
                            $rootScope,
                            $timeout,
                            promiseTracker,
                            ExpenseService,
                            expensesQueryResponse,
                            categories) {
  'ngInject';

  const _this = this, INFINITE_SCROLL_EXPENSES_OFFSET = 50, INFINITE_SCROLL_TIMEOUT = 1500;

  /**
   * Alert identifier
   */
  this.alertId = ALERTS_CONSTANTS.expenseList;

  /**
   * The current user
   */
  this.user = $rootScope.currentUser;

  /**
   * Existing categories.
   */
  this.categories = categories;

  /**
   * Expenses query response
   */
  this.expensesQueryResponse = expensesQueryResponse;

  /**
   * Existing expenses.
   */
  this.expenses = this.expensesQueryResponse.groupedExpensesDTOList;

  /**
   * Temporary list of existing expenses.
   */
  this.temporaryExpenses = [];

  /**
   * Create a delete tracker.
   */
  this.bulkDeleteTracker = promiseTracker();

  /**
   * On scroll, load more expenses.
   */
  this.loadMoreExpenses = loadMoreExpenses;

  /**
   * Is enough selected expenses for bulk action
   */
  this.isBulkActionEnabled = isBulkActionEnabled;

  /**
   * Cancels bulk action
   */
  this.cancelBulkAction = cancelBulkAction;

  /**
   * Performs bulk delete action
   */
  this.performBulkDelete = performBulkDelete;

  /**
   * Is no more expenses to be loaded
   */
  this.isNoMoreExpensesToBeLoaded = function () {
    return this.expensesQueryResponse.currentSize === this.expensesQueryResponse.totalSize;
  };

  /**
   * Is overall transactions empty
   */
  this.isOverallTransactionsEmpty = () => _this.expenses.length === 0 && _this.temporaryExpenses.length === 0;

  this.updateNoOfExpenses = () => {
    $scope.$emit(
      'updateUserStats',
      { args: { countExpenses: _this.expensesQueryResponse.totalSize } }
    );
  };

  // ---
  // Actual implementation.
  // ---

  this.updateNoOfExpenses();

  // ---
  // Private functions.
  // ---

  function loadMoreExpenses() {
    if (_this.isUpdatingListLayout || _this.isNoMoreExpensesToBeLoaded()) {
      return;
    }

    this.isUpdatingListLayout = true;

    ExpenseService
      .getAllExpensesGrouped(0, _.compose(_.flatten, _.map)(_this.expenses, 'expenseDTOs').length + INFINITE_SCROLL_EXPENSES_OFFSET)
      .then(response => {
        _this.expensesQueryResponse = response;
        _this.expenses = _this.expensesQueryResponse.groupedExpensesDTOList;

        // ---
        // We did reload the whole list, therefore get rid of the temporary list.
        // ---
        _this.temporaryExpenses = [];
      })
      .finally(() => {
        $timeout(() => {
          _this.isUpdatingListLayout = !_this.isUpdatingListLayout;
        }, INFINITE_SCROLL_TIMEOUT);
      });
  }

  function isBulkActionEnabled() {
    return getSelectedExpensesForBulkAction().length >= APP_CONFIG.MIN_EXPENSES_TO_ENABLE_BULK_ACTION;
  }

  /**
   * Get selected expenses for bulk action (marked===true)
   */
  function getSelectedExpensesForBulkAction() {
    const flatMap = _.compose(_.flatten, _.map), expensesJoined = flatMap(_this.expenses, 'expenseDTOs');

    return _.filter(
      _(expensesJoined)
        .concat(_this.temporaryExpenses)
        .value(), 'marked', true);
  }

  function cancelBulkAction() {
    const allCurrentlySelected = getSelectedExpensesForBulkAction();

    _.each(allCurrentlySelected, currentlySelected => {
      currentlySelected.marked = !currentlySelected.marked;
    });
  }

  function performBulkDelete() {
    const selectedForBulkDelete = angular.copy(getSelectedExpensesForBulkAction());

    // ---
    // Try to save them at once and if successfully, update the user.
    // ---
    ExpenseService
      .bulkDelete(selectedForBulkDelete, _this.bulkDeleteTracker)
      .then(() => {
        $rootScope.$broadcast(EXPENSE_EVENTS.isDeleted, { expenses: selectedForBulkDelete });
      })
      .catch(() => {
        $rootScope.$broadcast(
          EXPENSE_EVENTS.isErrorOccurred,
          'We\'ve encountered an error while trying to perform bulk action.'
        );
      });
  }

  // ---
  // EVENT LISTENERS (listen for events from e.g. entries list).
  // ---

  /**
   * On expense created, display a success message, and add expense to the list.
   */
  $scope.$on(EXPENSE_EVENTS.isCreated, (event, args) => {
    _this.temporaryExpenses.push(args.expense);

    $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.expenseCreated);
    $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Saved expense.');
  });

  /**
   * On expense updated.
   */
  $scope.$on(EXPENSE_EVENTS.isUpdated, (event, args) => {
    const expenseExistsInList = _.some(_.compose(_.flatten, _.map)(_this.expenses, 'expenseDTOs'), 'id', args.expense.id);

    if (expenseExistsInList) {
      removeExpenseFromGroupedExpenses(_this.expenses, args.expense);
    } else {
      _.remove(_this.temporaryExpenses, 'id', args.expense.id);
    }

    _this.temporaryExpenses.push(args.expense);

    $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated expense.');
    $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.expenseUpdated);
  });

  /**
   * On expense deleted, display a success message, and remove the expense from the list.
   */
  $scope.$on(EXPENSE_EVENTS.isDeleted, (event, args) => {
    if (args.expenses) {
      removeBulkExpenses(args.expenses);
    }

    $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Deleted expense.');
    $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.expenseDeleted);
  });

  function removeExpenseFromGroupedExpenses(groupedExpenses, expenseToBeRemoved) {
    _.each(groupedExpenses, groupedExpenseEntry => {
      _.remove(groupedExpenseEntry.expenseDTOs, 'id', expenseToBeRemoved.id);
    });
  }

  function removeBulkExpenses(selectedForBulkDelete) {
    _.each(selectedForBulkDelete, selectedForBulkDeleteEntry => {
      removeExpenseFromGroupedExpenses(_this.expenses, selectedForBulkDeleteEntry);
      _.remove(_this.temporaryExpenses, 'id', selectedForBulkDeleteEntry.id);
    });
  }

  /**
   * On error occurred.
   */
  $scope.$on(EXPENSE_EVENTS.isErrorOccurred, (event, args) => {
    $scope.$emit(ALERTS_EVENTS.DANGER, {
      message: args.errorMessage,
      alertId: _this.alertId,
    });
  });

}

export default ExpensesController;
