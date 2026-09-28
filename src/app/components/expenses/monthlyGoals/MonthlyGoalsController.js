function MonthlyGoalsController(EXPENSE_EVENTS,
                                ALERTS_EVENTS,
                                USER_ACTIVITY_EVENTS,
                                $scope,
                                DatesUtils,
                                promiseTracker,
                                GoalService,
                                goals) {
  'ngInject';

  const _this = this;

  /**
   * Load insights
   */
  _this.loadGoals = loadGoals;

  /**
   * Goals of this month
   */
  _this.goals = goals;

  /**
   * Create a loading tracker.
   */
  _this.loadTracker = promiseTracker();

  /**
   * Load goals
   */
  function loadGoals() {
    const period = DatesUtils
      .fromLastMonthsToNow(1);

    GoalService
      .getAllGoalsFromTo(period.from, period.to, _this.loadTracker)
      .then(receivedGoals => {
        _this.goals = receivedGoals;

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

  // ---
  // Reload if necessary upon delete/update/create..
  // ---

  $scope.$on(EXPENSE_EVENTS.isCreated, (event, args) => {
    tryToReloadIfNecessary(args);
  });

  $scope.$on(EXPENSE_EVENTS.isDeleted, (event, args) => {
    tryToReloadIfNecessary(args);
  });

  $scope.$on(EXPENSE_EVENTS.isUpdated, (event, args) => {
    tryToReloadIfNecessary(args);
  });

  function tryToReloadIfNecessary(args) {
    if (args.expense) {
      reloadIfRequired(args.expense);
    } else if (args.expenses) {
      _.each(args.expenses, expenseCandidate => {
        reloadIfRequired(expenseCandidate);
      });
    }
  }

  function reloadIfRequired(expense) {
    const isSameMonth = moment().isSame(moment(expense.spentDate), 'month');

    if (isSameMonth) {
      _this.loadGoals();
    }
  }
}

export default MonthlyGoalsController;
