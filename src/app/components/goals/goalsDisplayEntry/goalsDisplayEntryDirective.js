export default

  function GoalsDisplayEntryController($rootScope) {

    /**
     * Current user.
     */
    this.user = $rootScope.currentUser;
  }

  angular
    .module('revaluate.goals')
    .directive('goalsDisplayEntry', function () {
      return {
        restrict: 'A',
        scope: {
          goal: '=',
        },
        controller: GoalsDisplayEntryController,
        bindToController: true,
        controllerAs: 'vm',
        templateUrl: '/app/components/goals/goalsDisplayEntry/goalsDisplayEntryDirective.tpl.html',
        link: function () {
        },
      };
    });

