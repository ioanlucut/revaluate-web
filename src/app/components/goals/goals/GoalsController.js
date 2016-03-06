export default

  function GoalsController(
    GOAL_EVENTS,
    ALERTS_EVENTS,
    USER_ACTIVITY_EVENTS,
    ALERTS_CONSTANTS,
    $scope,
    $rootScope,
    StatisticService,
    DatesUtils,
    promiseTracker,
    GoalService,
    monthsPerYearsStatistics,
    goals,
    categories) {

    const _this = this;

    /**
     * Alert identifier
     */
    this.alertId = ALERTS_CONSTANTS.goalList;

    /**
     * The current user
     */
    this.user = $rootScope.currentUser;

    /**
     * Existing categories.
     */
    this.categories = categories;

    /**
     * Existing goals.
     */
    this.goals = goals;

    /**
     * Insights months per years.
     */
    this.monthsPerYearsStatistics = monthsPerYearsStatistics;

    /**
     * Exposed goals data.
     */
    _this.goalsData = {
      yearMonthDate: moment().toDate(),
    };

    /**
     * On date change do load goals
     */
    _this.loadGoals = loadGoals;

    /**
     * Create a saving tracker.
     */
    _this.loadTracker = promiseTracker();

    /**
     * Create a saving tracker.
     */
    _this.updateStatisticsTracker = promiseTracker();

    /**
     * Is maximum number of allowed goals exceeded. Depends on the type of user.
     */
    _this.isMaximumNumberOfAllowedGoalsExceeded = isMaximumNumberOfAllowedGoalsExceeded;

    /**
     * Load goals
     */
    function loadGoals(yearMonthDate) {
      let period;

      if (_this.loadTracker.active()) {

        return;
      }

      period = DatesUtils
        .getFromToOfMonthYear(yearMonthDate);

      GoalService
        .getAllGoalsFromTo(period.from, period.to, _this.loadTracker)
        .then(receivedGoals => {
          _this.goals = receivedGoals;

          // ---
          // If there was a previously error, just clear it.
          // ---
          $scope.$emit(ALERTS_EVENTS.CLEAR, {
            alertId: _this.alertId,
          });
          $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.goalsFetched);
        })
        .catch(() => {
          _this.badPostSubmitResponse = true;
          $scope.$emit(ALERTS_EVENTS.DANGER, {
            message: 'Could not fetch goals.',
            alertId: _this.alertId,
          });
        });
    }

    function isMaximumNumberOfAllowedGoalsExceeded() {
      return _this.goals.length >= _this.categories.length;
    }

    function reloadMonthsPerYearsStatistics() {
      StatisticService
        .fetchGoalsMonthsPerYearStatistics(_this.updateStatisticsTracker)
        .then(receivedMonthsPerYearsStatistics => {
          _this.monthsPerYearsStatistics = receivedMonthsPerYearsStatistics;
        });
    }

    function updateNoOfGoals() {
      $scope.$emit('updateUserStats', { args: { countGoals: _this.goals.length } });
    }

    // ---
    // EVENT LISTENERS (listen for events from e.g. entries list).
    // ---

    /**
     * On goal created, display a success message, and add goal to the list.
     */
    $scope.$on(GOAL_EVENTS.isCreated, (event, args) => {
      const isSameMonth = moment(_this.goalsData.yearMonthDate).isSame(moment(args.goal.yearMonthDate), 'month');

      if (isSameMonth) {
        _this.goals.push(args.goal);
      } else {
        reloadMonthsPerYearsStatistics();
      }

      $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.goalCreated);
      $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Saved');
      updateNoOfGoals();
    });

    /**
     * On goal updated.
     */
    $scope.$on(GOAL_EVENTS.isUpdated, (event, args) => {
      reloadMonthsPerYearsStatistics();

      _.remove(_this.goals, 'id', args.goal.id);
      _this.goals.push(args.goal);

      $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
      $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.goalUpdated);
    });

    /**
     * On goal deleted, display a success message, and remove the goal from the list.
     */
    $scope.$on(GOAL_EVENTS.isDeleted, (event, args) => {
      if (args.goal) {
        _.remove(_this.goals, 'id', args.goal.id);
        reloadMonthsPerYearsStatistics();
      }

      $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Deleted');
      $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.goalDeleted);
      updateNoOfGoals();
    });

    /**
     * On error occurred.
     */
    $scope.$on(GOAL_EVENTS.isErrorOccurred, (event, args) => {
      $scope.$emit(ALERTS_EVENTS.DANGER, {
        message: args.errorMessage,
        alertId: _this.alertId,
      });
    });

  }

