function AddGoalController(GOAL_EVENTS,
                           APP_CONFIG,
                           $scope,
                           GoalService,
                           DatesUtils,
                           Goal,
                           promiseTracker) {

  const _this = this;

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
  $scope.$on(GOAL_EVENTS.isCreated, () => {
    _this.toggleContent();
  });

  function initOrResetAddGoalForm() {
    _this.goal = Goal.build({
      yearMonthDate: moment().toDate(),
      goalTarget: _.first(_this.goalsTargets).value,
    });

    _this.category = {};

    if (_this.goalForm) {
      _this.goalForm.$setPristine();
    }

    _this.badPostSubmitResponse = false;
  }

  function saveGoal() {
    const period = DatesUtils
      .getFromToOfMonthYear(_this.goal.yearMonthDate);

    this.goal.category = angular.copy(this.category.selected);
    this.goal.startDate = period.from;
    this.goal.endDate = period.to;

    GoalService
      .createGoal(this.goal, _this.saveTracker)
      .then(createdGoal => {
        $scope.$emit(GOAL_EVENTS.isCreated, { goal: createdGoal });
        _this.initOrResetAddGoalForm();
      })
      .catch(() => {
        _this.badPostSubmitResponse = true;
        $scope.$emit(
          GOAL_EVENTS.isErrorOccurred,
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

function goalAddDirective() {
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
    link() {
    },
  };
}

export default goalAddDirective;
