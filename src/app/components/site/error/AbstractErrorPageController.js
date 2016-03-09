/**
 * Abstract error page controller.
 */
function AbstractErrorPageController($scope, StatesHandler) {

  /**
   * Track event.
   */
  $scope.trackErrorEvent = event => {
    $scope.$broadcast('trackEvent', event);
  };

  /**
   * Continues to home page.
   */
  $scope.goToHomePage = () => {
    StatesHandler.goHome();
  };
}

export default AbstractErrorPageController;
