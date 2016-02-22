(function () {
  'use strict';

  function AddGoalController(GOAL_EVENTS, APP_CONFIG, $scope, GoalService, DatesUtils, Goal, promiseTracker) {

    var vm = this;

    /**
     * Create a saving tracker.
     */
    this.saveTracker = promiseTracker();

    /**
     * Initializes or resets the add goal form
     */
    this.initOrResetAddGoalForm = initOrResetAddGoalForm;

    /**
     * Save goal functionality
     */
    this.saveGoal = saveGoal;

    /**
     * Open date picker
     */
    this.openDatePicker = openDatePicker;

    /**
     * Minimum date to create goal - now.
     */
    this.datePickerMinDate = moment();

    /**
     * Max date to create goal
     */
    this.datePickerMaxDate = moment().year(APP_CONFIG.MAX_YEAR_TO_CREATE_GOAL);

    /**
     * Goals targets available
     */
    this.goalsTargets = APP_CONFIG.GOALS_TARGETS;

    /**
     * Show block content
     */
    this.showContent = false;

    /**
     * Toggle content
     */
    this.toggleContent = function () {
      this.showContent = !this.showContent;
    };

    /**
     * Perform the first initialization.
     */
    this.initOrResetAddGoalForm();

    /**
     * On goal created, we toggle content.
     */
    $scope.$on(GOAL_EVENTS.isCreated, function () {
      vm.toggleContent();
    });

    function initOrResetAddGoalForm() {
      vm.goal = Goal.build({
        yearMonthDate: moment().toDate(),
        goalTarget: _.first(vm.goalsTargets).value,
      });

      vm.category = {};

      if (vm.goalForm) {
        vm.goalForm.$setPristine();
      }

      vm.badPostSubmitResponse = false;
    }

    function saveGoal() {
      var period = DatesUtils
        .getFromToOfMonthYear(vm.goal.yearMonthDate);

      this.goal.category = angular.copy(this.category.selected);
      this.goal.startDate = period.from;
      this.goal.endDate = period.to;

      GoalService
        .createGoal(this.goal, vm.saveTracker)
        .then(function (createdGoal) {
          $scope.$emit(GOAL_EVENTS.isCreated, { goal: createdGoal });
          vm.initOrResetAddGoalForm();
        })
        .catch(function () {
          vm.badPostSubmitResponse = true;
          $scope.$emit(GOAL_EVENTS.isErrorOccurred, { errorMessage: 'Ups, something went wrong.' });
        });
    }

    function openDatePicker($event) {
      $event.preventDefault();
      $event.stopPropagation();

      vm.datePickerOpened = true;
    }

  }

  angular
    .module('revaluate.goals')
    .directive('goalAdd', function () {
      return {
        restrict: 'A',
        scope: {
          categories: '=',
          isMaximumNumberOfAllowedGoalsExceeded: '&',
        },
        controller: AddGoalController,
        bindToController: true,
        controllerAs: 'vm',
        templateUrl: '/app/components/goals/goalAdd/goalAddDirective.tpl.html',
        link: function () {
        },
      };
    });
}());
