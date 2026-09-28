function ExpenseEntryController(EXPENSE_EVENTS,
                                APP_CONFIG,
                                $rootScope,
                                ExpenseService,
                                Category,
                                promiseTracker) {
  'ngInject';

  const _this = this;

  /**
   * Current user.
   */
  this.user = $rootScope.currentUser;

  /**
   * Minimum date to create expense.
   */
  this.minDate = angular.copy(APP_CONFIG.EXPENSES_ALLOWED_MIN_DATE);

  /**
   * Keep the master backup. Work only with shownExpense.
   */
  this.shownExpense = angular.copy(this.expense);

  /**
   * Selected category
   */
  this.category = _.extend({}, { selected: new Category(this.shownExpense.category) });

  /**
   * We need an object in the scope as this model is changed by the
   * datePicker and we want to see those changes. Remember '.' notation.
   */
  this.datePickerStatus = {};

  /**
   * Max date to create expense
   */
  this.maxDate = moment().hours(0).minutes(0).seconds(0);

  /**
   * Update the expense.
   */
  this.updateExpense = updateExpense;

  /**
   * Toggle mark for bulk action
   */
  this.toggleMark = toggleMark;

  /**
   * Open date picker
   */
  this.openDatePicker = openDatePicker;

  /**
   * Discard changes
   */
  this.discardChanges = discardChanges;

  /**
   * Create an updating tracker.
   */
  _this.updateTracker = promiseTracker();

  function updateExpense() {
    _this.shownExpense = _.extend(_this.shownExpense, {
      category: angular.copy(_this.category.selected),
    });

    ExpenseService
      .updateExpense(_this.shownExpense, _this.updateTracker)
      .then(updatedExpense => {
        $rootScope.$broadcast(
          EXPENSE_EVENTS.isUpdated,
          { expense: _.extend(_this.shownExpense, updatedExpense) }
        );
      })
      .catch(() => {
        _this.badPostSubmitResponse = true;
        $rootScope.$broadcast(
          EXPENSE_EVENTS.isErrorOccurred,
          { errorMessage: 'Ups, something went wrong.' }
        );
      });
  }

  function toggleMark() {
    _this.expense.marked = !_this.expense.marked;

    // ---
    // We need this info also in the parent scope, so we synchronize the master too.
    // ---
    _this.shownExpense.marked = _this.expense.marked;
  }

  function openDatePicker($event) {
    $event.preventDefault();
    $event.stopPropagation();

    _this.datePickerStatus.opened = true;
  }

  function discardChanges() {
    _this.shownExpense = angular.copy(_this.expense);
    _this.category = _.extend({}, { selected: new Category(_this.shownExpense.category) });
  }

}

function expenseEntryDirective(EXPENSE_EVENTS, $rootScope, $timeout) {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
      categories: '=',
      expense: '=',
    },
    controller: ExpenseEntryController,
    bindToController: true,
    controllerAs: 'vm',
    templateUrl: '/app/components/expenses/expenseEntry/expenseEntryDirective.tpl.html',
    link(scope, el, attrs, _this) {
      const EXPENSE_INPUT_SELECTOR = '.expense-add__price__input';

      /**
       * If date details should be shown
       */
      scope.showDateDetails = !_.isUndefined(attrs.showDateDetails);

      /**
       * Show block content
       */
      scope.showContent = false;

      /**
       * Toggle content
       */
      scope.toggleContent = () => {
        scope.showContent = !scope.showContent;

        // ---
        // Auto focus price.
        // ---
        if (scope.showContent) {
          $timeout(() => {
            el.find(EXPENSE_INPUT_SELECTOR).focus();
          });
        }
      };

      /**
       * Toggle and discard changes.
       */
      scope.cancel = () => {
        scope.toggleContent();

        _this.discardChanges();
      };

      /**
       * On expense updated/deleted - cancel edit mode.
       */
      $rootScope.$on(EXPENSE_EVENTS.isUpdated, (event, args) => {
        if (_this.expense.id === args.expense.id) {

          // ---
          // Now update the master expense, and remove the marked sign.
          // ---
          _this.shownExpense.marked = false;
          _this.expense = angular.copy(_this.shownExpense);

          scope.cancel();
        }
      });
    },
  };
}

export default expenseEntryDirective;
