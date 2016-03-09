function GoalListController($timeout) {
  var _this = this,
    TIMEOUT = 200;

  /**
   * Initial selected order by
   */
  this.selectedOrderBy = 'createdDate';

  /**
   * Sets the selected order by
   */
  this.setSelectedOrderBy = setSelectedOrderBy;

  /**
   * Is loading more goals flag.
   */
  this.isUpdatingListLayout = false;

  function setSelectedOrderBy(by) {
    _this.isUpdatingListLayout = !_this.isUpdatingListLayout;

    $timeout(function () {
      _this.selectedOrderBy = by;
      _this.isUpdatingListLayout = !_this.isUpdatingListLayout;
    }, TIMEOUT);
  }
}

function goalsListDirective() {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      goals: '=',
      categories: '=',
    },
    controller: GoalListController,
    bindToController: true,
    controllerAs: 'vm',
    templateUrl: '/app/components/goals/goalsList/goalsListDirective.tpl.html',
    link: function (scope, el, attrs) {

      scope.reverseOrder = attrs.sort === 'desc';
    },
  };
}

export default goalsListDirective;
