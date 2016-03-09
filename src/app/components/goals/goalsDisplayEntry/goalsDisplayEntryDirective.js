function GoalsDisplayEntryController($rootScope) {

  /**
   * Current user.
   */
  this.user = $rootScope.currentUser;
}

function goalsDisplayEntryDirective() {
  return {
    restrict: 'A',
    scope: {
      goal: '=',
    },
    controller: GoalsDisplayEntryController,
    bindToController: true,
    controllerAs: 'vm',
    templateUrl: '/app/components/goals/goalsDisplayEntry/goalsDisplayEntryDirective.tpl.html',
    link() {
    },
  };
}

export default goalsDisplayEntryDirective;
