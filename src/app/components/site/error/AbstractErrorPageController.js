/**
 * Abstract error page controller.
 */
function AbstractErrorPageController($scope, StatesHandler) {

  /**
   * Track event.
   */
  $scope.trackErrorEvent = function (event) {
    $scope.$broadcast('trackEvent', event);
  };

  /**
   * Continues to home page.
   */
  $scope.goToHomePage = function () {
    StatesHandler.goHome();
  };
}

export default AbstractErrorPageController;
