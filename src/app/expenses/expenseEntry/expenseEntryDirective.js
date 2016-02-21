(function () {
  'use strict';

  function ExpenseEntryController(EXPENSE_EVENTS, APP_CONFIG, $rootScope, ExpenseService, Category, promiseTracker) {

    var vm = this;

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
    vm.updateTracker = promiseTracker();

    function updateExpense() {
      vm.shownExpense = _.extend(vm.shownExpense, {
        category: angular.copy(vm.category.selected),
      });

      ExpenseService
        .updateExpense(vm.shownExpense, vm.updateTracker)
        .then(function (updatedExpense) {
          $rootScope.$broadcast(EXPENSE_EVENTS.isUpdated, { expense: _.extend(vm.shownExpense, updatedExpense) });
        })
        .catch(function () {
          vm.badPostSubmitResponse = true;
          $rootScope.$broadcast(EXPENSE_EVENTS.isErrorOccurred, { errorMessage: 'Ups, something went wrong.' });
        });
    }

    function toggleMark() {
      vm.expense.marked = !vm.expense.marked;

      // ---
      // We need this info also in the parent scope, so we synchronize the master too.
      // ---
      vm.shownExpense.marked = vm.expense.marked;
    }

    function openDatePicker($event) {
      $event.preventDefault();
      $event.stopPropagation();

      vm.datePickerStatus.opened = true;
    }

    function discardChanges() {
      vm.shownExpense = angular.copy(vm.expense);
      vm.category = _.extend({}, { selected: new Category(vm.shownExpense.category) });
    }

  }

  angular
    .module('revaluate.expenses')
    .directive('expenseEntry', function (EXPENSE_EVENTS, $rootScope, $timeout) {
      return {
        restrict: 'A',
        scope: {
          categories: '=',
          expense: '=',
        },
        controller: ExpenseEntryController,
        bindToController: true,
        controllerAs: 'vm',
        templateUrl: '/app/expenses/expenseEntry/expenseEntryDirective.tpl.html',
        link: function (scope, el, attrs, vm) {
          var EXPENSE_INPUT_SELECTOR = '.expense__form__price__input';

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
          scope.toggleContent = function () {
            scope.showContent = !scope.showContent;

            // ---
            // Auto focus price.
            // ---
            if (scope.showContent) {
              $timeout(function () {
                el.find(EXPENSE_INPUT_SELECTOR).focus();
              });
            }
          };

          /**
           * Toggle and discard changes.
           */
          scope.cancel = function () {
            scope.toggleContent();

            vm.discardChanges();
          };

          /**
           * On expense updated/deleted - cancel edit mode.
           */
          $rootScope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
            if (vm.expense.id === args.expense.id) {

              // ---
              // Now update the master expense, and remove the marked sign.
              // ---
              vm.shownExpense.marked = false;
              vm.expense = angular.copy(vm.shownExpense);

              scope.cancel();
            }
          });
        },
      };
    });
}());
