function GoalEntryController(GOAL_EVENTS,
                             APP_CONFIG,
                             $rootScope,
                             GoalService,
                             DatesUtils,
                             Category,
                             GoalProgressTypeService,
                             GoalMessagesService,
                             promiseTracker) {

  const _this = this;

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
  _this.updateTracker = promiseTracker();

  /**
   * Create an deleting tracker.
   */
  _this.deleteTracker = promiseTracker();

  /**
   * Delete goal;
   */
  _this.deleteGoal = deleteGoal;

  // ---
  // Just a message.
  // ---
  _this.message = GoalMessagesService.getMessage(GoalProgressTypeService.computeProgressBarType(_this.shownGoal));

  function updateGoal() {
    const period = DatesUtils
      .getFromToOfMonthYear(_this.shownGoal.yearMonthDate);

    _this.shownGoal = _.extend(_this.shownGoal, {
      category: angular.copy(_this.category.selected),
      startDate: period.from,
      endDate: period.to,
    });

    GoalService
      .updateGoal(_this.shownGoal, _this.updateTracker)
      .then(updatedGoal => {
        $rootScope.$broadcast(GOAL_EVENTS.isUpdated, { goal: _.extend(_this.shownGoal, updatedGoal) });
      })
      .catch(() => {
        _this.badPostSubmitResponse = true;
        $rootScope.$broadcast(
          GOAL_EVENTS.isErrorOccurred,
          { errorMessage: 'Ups, something went wrong.' }
        );
      });
  }

  function deleteGoal() {
    GoalService
      .bulkDelete([_this.goal], _this.deleteTracker)
      .then(() => {
        $rootScope.$broadcast(GOAL_EVENTS.isDeleted, { goal: _this.goal });
      })
      .catch(() => {
        $rootScope.$broadcast(
          GOAL_EVENTS.isErrorOccurred,
          { errorMessage: 'Ups, something went wrong.' }
        );
      });
  }

  function openDatePicker($event) {
    $event.preventDefault();
    $event.stopPropagation();

    _this.datePickerStatus.opened = true;
  }

  function discardChanges() {
    _this.shownGoal = angular.copy(_this.goal);
    _this.category = _.extend({}, { selected: new Category(_this.shownGoal.category) });
  }
}

function goalEntryDirective(GOAL_EVENTS, $rootScope, $timeout) {
  return {
    restrict: 'A',
    scope: {
      categories: '=',
      goal: '=',
    },
    controller: GoalEntryController,
    bindToController: true,
    controllerAs: 'vm',
    templateUrl: '/app/components/goals/goalEntry/goalEntryDirective.tpl.html',
    link(scope, el, attrs, _this) {
      const GOAL_INPUT_SELECTOR = '.goal__form__price__input';

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
            el.find(GOAL_INPUT_SELECTOR).focus();
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
       * On goal updated/deleted - cancel edit mode.
       */
      $rootScope.$on(GOAL_EVENTS.isUpdated, (event, args) => {
        if (_this.goal.id === args.goal.id) {

          // ---
          // Now update the master goal, and remove the marked sign.
          // ---
          _this.shownGoal.marked = false;
          _this.goal = angular.copy(_this.shownGoal);

          scope.cancel();
        }
      });
    },
  };
}

export default goalEntryDirective;
