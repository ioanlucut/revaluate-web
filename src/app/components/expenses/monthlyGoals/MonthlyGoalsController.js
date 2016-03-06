export default

function MonthlyGoalsController(
  EXPENSE_EVENTS,
  ALERTS_EVENTS,
  USER_ACTIVITY_EVENTS,
  $scope,
  DatesUtils,
  promiseTracker,
  GoalService,
  goals) {
  const vm = this;

  /**
   * Load insights
   */
  vm.loadGoals = loadGoals;

  /**
   * Goals of this month
   */
  vm.goals = goals;

  /**
   * Create a loading tracker.
   */
  vm.loadTracker = promiseTracker();

  /**
   * Load goals
   */
  function loadGoals() {
    const period = DatesUtils
      .fromLastMonthsToNow(1);

    GoalService
      .getAllGoalsFromTo(period.from, period.to, vm.loadTracker)
      .then(receivedGoals => {
        vm.goals = receivedGoals;

        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.goalsFetched);
      })
      .catch(() => {
        vm.badPostSubmitResponse = true;
        $scope.$emit(ALERTS_EVENTS.DANGER, {
          message: 'Could not fetch goals.',
          alertId: vm.alertId,
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
      vm.loadGoals();
    }
  }
}
