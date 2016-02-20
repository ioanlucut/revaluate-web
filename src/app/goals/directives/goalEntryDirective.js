(function () {
  'use strict';

  function GoalEntryController(GOAL_EVENTS, APP_CONFIG, $rootScope, GoalService, DatesUtils, Category, GoalProgressTypeService, GoalMessagesService, promiseTracker) {

    var vm = this;

    /**
     * Current user.
     */
    this.user = $rootScope.currentUser;

    /**
     * Minimum date to create goal.
     */
    this.minDate = moment();

    /**
     * Max date to create goal
     */
    this.maxDate = moment().year(APP_CONFIG.MAX_YEAR_TO_CREATE_GOAL);

    /**
     * Keep the master backup. Work only with shownGoal.
     */
    this.shownGoal = angular.copy(this.goal);

    /**
     * Goals targets available
     */
    this.goalsTargets = APP_CONFIG.GOALS_TARGETS;

    /**
     * Selected category
     */
    this.category = _.extend({}, { selected: new Category(this.shownGoal.category) });

    /**
     * We need an object in the scope as this model is changed by the
     * datePicker and we want to see those changes. Remember '.' notation.
     */
    this.datePickerStatus = {};

    /**
     * Update the goal.
     */
    this.updateGoal = updateGoal;

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

    /**
     * Create an deleting tracker.
     */
    vm.deleteTracker = promiseTracker();

    /**
     * Delete goal;
     */
    vm.deleteGoal = deleteGoal;

    // ---
    // Just a message.
    // ---
    vm.message = GoalMessagesService.getMessage(GoalProgressTypeService.computeProgressBarType(vm.shownGoal));

    function updateGoal() {
      var period = DatesUtils
        .getFromToOfMonthYear(vm.shownGoal.yearMonthDate);

      vm.shownGoal = _.extend(vm.shownGoal, {
        category: angular.copy(vm.category.selected),
        startDate: period.from,
        endDate: period.to,
      });

      GoalService
        .updateGoal(vm.shownGoal, vm.updateTracker)
        .then(function (updatedGoal) {
          $rootScope.$broadcast(GOAL_EVENTS.isUpdated, { goal: _.extend(vm.shownGoal, updatedGoal) });
        })
        .catch(function () {
          vm.badPostSubmitResponse = true;
          $rootScope.$broadcast(GOAL_EVENTS.isErrorOccurred, { errorMessage: 'Ups, something went wrong.' });
        });
    }

    function deleteGoal() {
      GoalService
        .bulkDelete([vm.goal], vm.deleteTracker)
        .then(function () {
          $rootScope.$broadcast(GOAL_EVENTS.isDeleted, { goal: vm.goal });
        })
        .catch(function () {
          $rootScope.$broadcast(GOAL_EVENTS.isErrorOccurred, { errorMessage: 'Ups, something went wrong.' });
        });
    }

    function openDatePicker($event) {
      $event.preventDefault();
      $event.stopPropagation();

      vm.datePickerStatus.opened = true;
    }

    function discardChanges() {
      vm.shownGoal = angular.copy(vm.goal);
      vm.category = _.extend({}, { selected: new Category(vm.shownGoal.category) });
    }
  }

  angular
    .module('revaluate.goals')
    .directive('goalEntry', function (GOAL_EVENTS, $rootScope, $timeout) {
      return {
        restrict: 'A',
        scope: {
          categories: '=',
          goal: '=',
        },
        controller: GoalEntryController,
        bindToController: true,
        controllerAs: 'vm',
        templateUrl: '/app/goals/partials/goalEntryDirective.tpl.html',
        link: function (scope, el, attrs, vm) {
          var GOAL_INPUT_SELECTOR = '.goal__form__price__input';

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
                el.find(GOAL_INPUT_SELECTOR).focus();
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
           * On goal updated/deleted - cancel edit mode.
           */
          $rootScope.$on(GOAL_EVENTS.isUpdated, function (event, args) {
            if (vm.goal.id === args.goal.id) {

              // ---
              // Now update the master goal, and remove the marked sign.
              // ---
              vm.shownGoal.marked = false;
              vm.goal = angular.copy(vm.shownGoal);

              scope.cancel();
            }
          });
        },
      };
    });
}());
