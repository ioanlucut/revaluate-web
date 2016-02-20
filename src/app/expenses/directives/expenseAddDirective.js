(function () {
  'use strict';

  function AddExpenseController(EXPENSE_EVENTS, APP_CONFIG, $scope, $rootScope, ExpenseService, Expense, promiseTracker) {

    var vm = this;

    /**
     * Current user.
     */
    this.user = $rootScope.currentUser;

    /**
     * Create a saving tracker.
     */
    this.saveTracker = promiseTracker();

    /**
     * Initialize or reset the add expense form
     */
    this.initOrResetAddExpense = initOrResetAddExpense;

    /**
     * The save expense functionality
     */
    this.saveExpense = saveExpense;

    /**
     * Open date picker
     */
    this.openDatePicker = openDatePicker;

    /**
     * Minimum date to create expense.
     */
    this.datePickerMinDate = angular.copy(APP_CONFIG.EXPENSES_ALLOWED_MIN_DATE);

    /**
     * Perform the first initialization.
     */
    this.initOrResetAddExpense();

    function initOrResetAddExpense() {
      vm.expense = new Expense({
        spentDate: moment().toDate(),
      });

      vm.category = {};

      if (vm.expenseForm) {
        vm.expenseForm.$setPristine();
      }

      vm.badPostSubmitResponse = false;

      /**
       * Max date to create expense
       */
      vm.datePickerMaxDate = moment().hours(0).minutes(0).seconds(0);
    }

    function saveExpense() {
      this.expense.category = angular.copy(this.category.selected);

      ExpenseService
        .createExpense(this.expense, vm.saveTracker)
        .then(function (createdExpense) {
          $rootScope.$broadcast(EXPENSE_EVENTS.isCreated, { expense: createdExpense });
          vm.initOrResetAddExpense();
        })
        .catch(function () {
          vm.badPostSubmitResponse = true;
          $scope.$emit(EXPENSE_EVENTS.isErrorOccurred, { errorMessage: 'Ups, something went wrong.' });
        });
    }

    function openDatePicker($event) {
      $event.preventDefault();
      $event.stopPropagation();

      vm.datePickerOpened = true;
    }

  }

  angular
    .module('revaluate.expenses')
    .directive('expenseAdd', function () {
      return {
        restrict: 'A',
        scope: {
          categories: '=',
        },
        controller: AddExpenseController,
        bindToController: true,
        controllerAs: 'vm',
        templateUrl: '/app/expenses/partials/expenseAddDirective.tpl.html',
        link: function () {
        },
      };
    });
}());
